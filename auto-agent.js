import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL ?? "https://api.minimax.io/anthropic"
});

const LOG_FILE = 'REFACTOR_LOG.md';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function appendLog(entry) {
  const timestamp = getToday();
  fs.appendFileSync(LOG_FILE, `\n### ${timestamp}\n${entry}\n`);
}

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

function commitChange(filePath, message) {
  try {
    execSync(`git add "${filePath}"`, { stdio: 'pipe' });
    execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
    console.log(`  Committed: ${filePath}`);
    return true;
  } catch (e) {
    console.log(`  Commit failed for ${filePath}: ${e.message}`);
    return false;
  }
}

async function askMiniMax() {
  const fileTree = getFileTree();
  const today = getToday();

  console.log(`Scanning codebase for improvements...\n`);

  const message = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `You are an autonomous code refactoring agent. Today is ${today}.

Your job: Scan the codebase, find ALL issues, and fix them one by one.
Each fix should be committed SEPARATELY with a meaningful commit message.
Log each fix to REFACTOR_LOG.md.

DIRECTORY STRUCTURE:
${fileTree}

For today, analyze the ENTIRE codebase and find EVERYTHING that needs improvement.
Focus on:
- Security (XSS, injection, exposed secrets, unsafe patterns)
- Code duplication (repeated logic should be extracted)
- Large components (should be split)
- Missing error handling / silent failures
- Unused imports, deps, files
- Performance issues
- Best practices violations
- TypeScript improvements
- Accessibility improvements

Respond with a JSON array (no markdown, just raw JSON). Each item is one fix:
[
  {
    "path": "file path to create/edit/delete",
    "action": "create|edit|delete",
    "content": "full file content if create/edit, null if delete",
    "commit_message": "short descriptive commit message"
  },
  ...
]

If no issues found, return an empty array: []
Keep the list focused - fix only 3-5 most important issues per day (or fewer if none critical).
Do NOT list everything wrong - just the top priorities that will have biggest impact.`}
    }]
  });

  return message.content[0].text;
}

function applyChange(action, filePath, content) {
  if (!action || action === 'noop') return false;

  try {
    const dir = path.dirname(filePath);
    if (dir && dir !== '.' && dir !== '..') {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (action === 'delete') {
      fs.unlinkSync(filePath);
    } else {
      fs.writeFileSync(filePath, content);
    }
    return true;
  } catch (e) {
    console.log(`  Failed to apply ${filePath}: ${e.message}`);
    return false;
  }
}

async function main() {
  const today = getToday();
  console.log(`\n=== Refactor Agent - ${today} ===\n`);

  const response = await askMiniMax();

  let fixes;
  try {
    fixes = JSON.parse(response.trim());
  } catch (e) {
    console.log('Could not parse AI response:', e.message);
    console.log('Raw:', response.slice(0, 500));
    return;
  }

  if (!Array.isArray(fixes) || fixes.length === 0) {
    console.log('No issues found today. Codebase looks good!');
    appendLog(`✅ ${today} - No critical issues found`);
    return;
  }

  console.log(`Found ${fixes.length} issue(s) to fix:\n`);

  const logged = [];

  for (const fix of fixes) {
    console.log(`\n${fix.commit_message || 'Fix'}`);
    console.log(`  Path: ${fix.path}`);

    const applied = applyChange(fix.action, fix.path, fix.content);
    if (applied && fix.path) {
      const committed = commitChange(fix.path, fix.commit_message || 'chore: refactor');
      if (committed) {
        logged.push(`- **${fix.path}**: ${fix.commit_message || fix.action}`);
      }
    }
  }

  if (logged.length > 0) {
    const logEntry = `✅ Fixed ${logged.length} issue(s):\n${logged.join('\n')}`;
    appendLog(logEntry);
  }

  console.log(`\n=== Done ===`);
  console.log(`Logged to ${LOG_FILE}`);
}

main().catch(e => {
  console.error('Agent Error:', e);
  process.exit(1);
});