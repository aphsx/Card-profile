import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL ?? "https://api.minimax.io/anthropic"
});

const PROGRESS_FILE = 'REFACTOR_LOG.md';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function readLog() {
  try {
    return fs.readFileSync(PROGRESS_FILE, 'utf8');
  } catch {
    return '';
  }
}

function appendLog(entry) {
  const timestamp = getToday();
  const logEntry = `\n### ${timestamp}\n${entry}\n`;
  fs.appendFileSync(PROGRESS_FILE, logEntry);
}

function getLastWork(log) {
  const lines = log.split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    const m = lines[i].match(/^### (\d{4}-\d{2}-\d{2})$/);
    if (m) return m[1];
  }
  return null;
}

function getFileTree() {
  const files = [];
  const ignore = ['node_modules', '.next', '.git', '.claude'];

  function walk(dir, prefix = '') {
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
  }

  walk('.');
  return files.join('\n');
}

function getFileContent(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > 50000) return null; // skip large files
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function askMiniMax(lastWork) {
  const fileTree = getFileTree();
  const today = getToday();

  console.log(`Analyzing codebase for improvements...`);

  const message = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `You are an autonomous code refactoring agent. Today is ${today}.

Your job:
1. Scan the codebase and find ONE thing to improve today
2. It should be one of: refactor, optimize, fix security issue, improve code quality, remove dead code
3. Make the change and commit it

WORKING DIRECTORY structure:
${fileTree}

Last work done: ${lastWork || 'none yet'}

First, briefly analyze the entire codebase for issues. Then pick the MOST IMPORTANT one thing to fix today.

Respond with a JSON object only (no markdown):
{
  "analysis": "brief summary of what you found and what you decided to do today",
  "action": "create|edit|delete",
  "path": "file path to change",
  "content": "full new file content if create/edit, null otherwise",
  "commit_message": "short commit message for this change"
}

Focus on:
- Security vulnerabilities (XSS, injection, exposed secrets)
- Code duplication that should be extracted
- Large files that should be split
- Missing error handling
- Unused code/imports
- Performance issues
- Best practices violations

Pick the thing that will have the biggest impact with the smallest change.`}
    }]
  });

  return message.content[0].text;
}

async function applyChange(action, filePath, content) {
  if (!action || action === 'noop') return false;

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
}

async function main() {
  const today = getToday();
  console.log(`\n=== Refactor Agent ===`);
  console.log(`Date: ${today}\n`);

  const log = readLog();
  const lastWork = getLastWork(log);

  const response = await askMiniMax(lastWork);

  let parsed;
  try {
    parsed = JSON.parse(response.trim());
  } catch (e) {
    console.log('Could not parse AI response:', e.message);
    console.log('Raw response:', response.slice(0, 500));
    return;
  }

  console.log(`\nAnalysis: ${parsed.analysis || 'N/A'}`);

  if (parsed.action && parsed.action !== 'noop' && parsed.path) {
    const changed = await applyChange(parsed.action, parsed.path, parsed.content);
    if (changed) {
      console.log(`Changed: ${parsed.path}`);
      console.log(`Commit: ${parsed.commit_message || 'chore: refactor'}`);

      appendLog(`**${parsed.path}**\n${parsed.analysis || ''}\nCommit: ${parsed.commit_message || 'chore: refactor'}`);
    }
  } else {
    console.log('No changes needed today.');
    appendLog(`No changes needed - ${parsed.analysis || 'codebase looks good'}`);
  }

  console.log(`\nLog updated: ${PROGRESS_FILE}`);
}

main().catch(e => {
  console.error('Agent Error:', e);
  process.exit(1);
});