import { Octokit } from "@octokit/rest";
import Anthropic from '@anthropic-ai/sdk';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.minimax.io/anthropic"
});

const REPO_OWNER = "aphsx";
const REPO_NAME = "Card-profile";
const MAX_RETRIES = 3;

async function getFailedWorkflowData() {
  const { data: runs } = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    per_page: 5,
    status: "completed"
  });

  const failedRun = runs.workflow_runs.find(r => r.conclusion === 'failure');
  if (!failedRun) {
    console.log("✅ No failed workflows found");
    return null;
  }

  console.log(`❌ Detected failed workflow #${failedRun.run_number}: ${failedRun.name}`);

  const { data: jobs } = await octokit.rest.actions.listJobsForWorkflowRun({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    run_id: failedRun.id
  });

  const failedJob = jobs.jobs.find(j => j.conclusion === 'failure');
  if (!failedJob) return null;

  try {
    const { data: logText } = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      job_id: failedJob.id
    });

    const logSlice = typeof logText === 'string' ? logText.slice(-4000) : String(logText).slice(-4000);
    return { runNumber: failedRun.run_number, jobName: failedJob.name, log: logSlice };
  } catch (e) {
    return { runNumber: failedRun.run_number, jobName: failedJob.name, log: "Could not fetch logs" };
  }
}

async function askMiniMaxToFix(failedData) {
  const packageJson = await import('fs').then(fs => fs.readFileSync('package.json', 'utf8'));

  console.log("🧠 Sending error log to MiniMax for analysis...");

  const message = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 2048,
    messages: [{
      role: "user",
      content: `You are a DevOps expert. The Next.js GitHub Actions build failed.

Error Log:
${failedData.log}

package.json:
${packageJson}

Analysis: What caused this failure? Reply with:
1. Root cause
2. Exact files to fix and the specific changes
3. Shell commands needed (if any)
4. If unfixable, say "UNFIXABLE: reason"

Format: JSON format in a code block with root_cause, files (array of {path, content}), commands (array), and status fields.`
    }]
  });

  return message.content[0].text;
}

async function applyFix(fixText, runNumber) {
  try {
    const jsonMatch = fixText.match(/```json([\s\S]*?)```/);
    if (!jsonMatch) {
      console.log("⚠️ No JSON fix data found in response");
      return false;
    }

    const fix = JSON.parse(jsonMatch[1]);

    if (fix.status === 'UNFIXABLE' || !fix.files?.length) {
      console.log(`❌ Cannot auto-fix: ${fix.root_cause || 'Unknown reason'}`);
      return false;
    }

    for (const file of fix.files) {
      const { writeFileSync } = await import('fs');
      writeFileSync(file.path, file.content);
      console.log(`🔧 Fixed: ${file.path}`);
    }

    if (fix.commands?.length) {
      console.log("📦 Running commands...");
      for (const cmd of fix.commands) {
        console.log(`  $ ${cmd}`);
      }
    }

    return true;
  } catch (e) {
    console.error("Failed to parse/apply fix:", e.message);
    return false;
  }
}

async function main() {
  const triggerRunId = process.env.GITHUB_RUN_ID;

  console.log("🔍 Checking for failed workflows...");

  // Check if this run was triggered by another workflow (prevent loops)
  const triggeringRun = process.env.WORKFLOW_TRIGGER_RUN_ID;

  const failedData = await getFailedWorkflowLog();
  if (!failedData) return;

  const fixResult = await askMiniMaxToFix(failedData);
  const applied = await applyFix(fixResult, failedData.runNumber);

  if (applied) {
    console.log("✅ Auto-fix applied successfully");
    // Don't re-trigger - let the next scheduled run verify
  } else {
    console.log("⚠️ Could not auto-fix, manual intervention needed");
  }
}

main().catch(e => {
  console.error("DevOps Agent Error:", e);
  process.exit(1);
});