import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL ?? "https://api.minimax.io/anthropic"
});

function getFileTree() {
  const files = [];
  const ignore = ['node_modules', '.next', '.git', '.claude'];

  function walk(dir, prefix = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (ignore.includes(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(`${prefix}${entry.name}/`);
          walk(fullPath, prefix + '  ');
        } else {
          files.push(`${prefix}${entry.name}`);
        }
      }
    } catch {}
  }

  walk('.');
  return files.join('\n');
}

async function askMiniMax() {
  const fileTree = getFileTree();
  const today = new Date().toISOString().split('T')[0];

  console.log('Scanning codebase...\n');

  const message = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `You are an expert developer. Today is ${today}.

Look at this codebase, decide what needs improvement, and make the changes yourself.

DIRECTORY:
${fileTree}

Think about what would make this codebase better. You can:
- Fix bugs or security issues
- Improve structure or organization
- Add tests
- Refactor for clarity
- Remove dead code
- Improve performance
- ANYTHING important

Read files you think need changes. Make the changes and commit them.

Respond with a JSON array (no markdown):
[
  {
    "path": "file path",
    "action": "create|edit|delete",
    "content": "full file content if create/edit",
    "commit": "short commit message"
  }
]

Make at least ONE meaningful commit today. Find the most important thing to fix.`
    }]
  });

  const content = message.content;
  const textBlock = content.find(b => b.type === 'text');
  return textBlock?.text ?? content[0]?.text ?? '';
}

function applyChange(action, filePath, content) {
  if (!action || action === 'noop' || action === 'delete') return false;

  const dir = path.dirname(filePath);
  if (dir && dir !== '.' && dir !== '..') {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);
  return true;
}

async function generateCommitMessage(filePath, action) {
  try {
    const diff = execSync(`git diff --staged "${filePath}" 2>/dev/null || git diff "${filePath}" 2>/dev/null || echo ""`, {
      encoding: 'utf-8',
      maxBuffer: 100 * 1024
    });

    const stats = execSync(`git diff --stat --stat-width=200 "${filePath}" 2>/dev/null || echo ""`, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024
    });

    const response = await client.messages.create({
      model: "MiniMax-M2.7",
      max_tokens: 256,
      messages: [{
        role: "user",
        content: `Generate a short, concise git commit message (under 72 chars) for this change.

File: ${filePath}
Action: ${action}
Diff stats: ${stats.trim()}

Diff:
${diff.slice(0, 2000)}

Respond with ONLY the commit message, no quotes, no explanation.`
      }]
    });

    const text = response.content.find(b => b.type === 'text')?.text ?? response.content[0]?.text ?? '';
    return text.trim().split('\n')[0].replace(/^["']|["']$/g, '');
  } catch (e) {
    return 'chore: update';
  }
}

function getVerificationCommands() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const commands = [];

  if (pkg.scripts?.test) commands.push({ cmd: 'npm test', name: 'test' });
  if (pkg.scripts?.build) commands.push({ cmd: 'npm run build', name: 'build' });
  if (pkg.scripts?.lint) commands.push({ cmd: 'npm run lint', name: 'lint' });
  if (pkg.scripts?.typecheck) commands.push({ cmd: 'npm run typecheck', name: 'typecheck' });

  return commands;
}

async function checkVercelStatus() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch('https://api.vercel.com/v6/deployments?limit=1', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    const latest = data.deployments?.[0];
    if (!latest) return null;

    return {
      url: latest.url,
      state: latest.state,
      readyState: latest.readyState,
      error: latest.error || null
    };
  } catch (e) {
    return null;
  }
}

function captureVerificationErrors() {
  const verifications = getVerificationCommands();
  if (verifications.length === 0) return '';

  let errorLog = '';
  for (const v of verifications) {
    try {
      execSync(v.cmd, { stdio: 'pipe' });
    } catch (e) {
      errorLog += `${v.name}: ${e.stderr?.toString() || e.stdout?.toString() || e.message}\n`;
    }
  }
  return errorLog;
}

async function runVerificationAndFix(fix, errorLog) {
  const verifications = getVerificationCommands();
  const failed = verifications.filter(v => errorLog.includes(v.name));

  if (failed.length === 0) return true;

  console.log(`\n  Verification failed: ${failed.map(v => v.name).join(', ')}. Asking AI to fix...\n`);

  const fixResponse = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `The following changes caused verification failures:

File: ${fix.path}
Failed: ${failed.map(v => v.name).join(', ')}

Error log:
${errorLog}

Fix the issue. Return a JSON object:
{
  "path": "file path",
  "action": "edit",
  "content": "corrected full file content"
}

Only return the JSON, no explanation.`
    }]
  });

  const text = fixResponse.content.find(b => b.type === 'text')?.text ?? fixResponse.content[0]?.text ?? '';
  let jsonStr = text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');

  try {
    const corrected = JSON.parse(jsonStr);
    if (corrected.content) {
      fs.writeFileSync(corrected.path, corrected.content);
      console.log(`  Applied fix to ${corrected.path}`);
      return false;
    }
  } catch (e) {
    console.log(`  Could not parse fix response: ${e.message}`);
  }
  return false;
}

async function checkDeployment() {
  console.log('  Checking Vercel deployment status...');

  const status = await checkVercelStatus();
  if (!status) {
    console.log('  Vercel status unavailable (no token or API error)');
    return null;
  }

  const stateName = status.readyState || status.state;
  console.log(`  Vercel: ${stateName}`);

  if (status.error) {
    console.log(`  Vercel error: ${status.error}`);
    return { failed: ['vercel'], error: status.error, url: status.url };
  }

  if (stateName === 'READY' || stateName === 'BUILDING') {
    console.log(`  Deployment OK: ${status.url}`);
    return null;
  }

  return { failed: ['vercel'], error: `Deployment state: ${stateName}`, url: status.url };
}

async function fixVercelError(deploymentError, url) {
  console.log('\n  Deployment failed. Asking AI to fix...\n');

  const fixResponse = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `The Vercel deployment failed.

Deployment URL: ${url}
Error: ${deploymentError}

This is a Next.js project. Fix the issue that caused the deployment to fail.

Return a JSON array of file changes:
[
  {
    "path": "file path",
    "action": "edit",
    "content": "corrected full file content"
  }
]

Only return the JSON, no explanation.`
    }]
  });

  const text = fixResponse.content.find(b => b.type === 'text')?.text ?? fixResponse.content[0]?.text ?? '';
  let jsonStr = text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');

  try {
    const fixes = JSON.parse(jsonStr);
    if (Array.isArray(fixes)) {
      for (const f of fixes) {
        if (f.path && f.content) {
          fs.writeFileSync(f.path, f.content);
          console.log(`  Fixed: ${f.path}`);
        }
      }
      return true;
    }
  } catch (e) {
    console.log(`  Could not parse fix response: ${e.message}`);
  }
  return false;
}

async function main() {
  console.log('\n=== Refactor Agent ===\n');

  const response = await askMiniMax();

  let fixes;
  try {
    // Strip markdown code blocks if present
    let jsonStr = response.trim();
    jsonStr = jsonStr.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    fixes = JSON.parse(jsonStr);
  } catch (e) {
    console.log('Could not parse response:', e.message);
    console.log('Raw:', response.slice(0, 300));
    return;
  }

  if (!Array.isArray(fixes) || fixes.length === 0) {
    console.log('No changes needed today.');
    return;
  }

  console.log(`Found ${fixes.length} change(s):\n`);

  for (const fix of fixes) {
    if (!applyChange(fix.action, fix.path, fix.content)) continue;

    console.log(`- ${fix.path}`);

    try {
      execSync(`git add "${fix.path}"`, { stdio: 'pipe' });

      const commitMsg = await generateCommitMessage(fix.path, fix.action);
      execSync(`git commit -m "${commitMsg}"`, { stdio: 'pipe' });
      console.log(`  Committed: ${commitMsg}`);
    } catch (e) {
      console.log(`  Commit failed: ${e.message}`);
    }

    const errorLog = captureVerificationErrors();
    const success = errorLog ? await runVerificationAndFix(fix, errorLog) : true;
    if (!success) {
      let retryCount = 0;
      while (!success && retryCount < 3) {
        retryCount++;
        const nextErrorLog = captureVerificationErrors();
        if (!nextErrorLog) break;
        await runVerificationAndFix(fix, nextErrorLog);
      }
    }

    if (process.env.VERCEL_TOKEN) {
      const deployResult = await checkDeployment();
      if (deployResult?.failed) {
        const fixed = await fixVercelError(deployResult.error, deployResult.url);
        if (fixed) {
          console.log('  Re-committing and re-deploying...');
          execSync('git add -A', { stdio: 'pipe' });
          const newMsg = await generateCommitMessage('.', 'batch');
          execSync(`git commit -m "${newMsg}"`, { stdio: 'pipe' });
        }
      }
    }
  }

  console.log('\nDone.');
}

main().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});