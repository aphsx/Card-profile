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
  }

  console.log('\nDone.');
}

main().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});