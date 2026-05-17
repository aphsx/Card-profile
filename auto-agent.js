import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL ?? "https://api.minimax.io/anthropic"
});

const PLAN = [
  { day: 1, task: "Fix layout.tsx - remove XSS inline script, use ThemeToggle only", file: "app/layout.tsx" },
  { day: 2, task: "Fix use-language.tsx - add localStorage validation", file: "hooks/use-language.tsx" },
  { day: 3, task: "Fix theme-toggle.tsx - cookie-from-localStorage pattern", file: "components/theme-toggle.tsx" },
  { day: 4, task: "Extract cookie utils to lib/utils.ts", file: "lib/utils.ts" },
  { day: 5, task: "Fix hardcoded git credentials in workflow", file: ".github/workflows/auto-commit.yml" },
  { day: 6, task: "Add .env.example documenting env vars", file: ".env.example" },
  { day: 7, task: "Remove unused dependencies (framer-motion, iconify)", file: "package.json" },
  { day: 8, task: "Create /lib directory structure", file: "lib/" },
  { day: 9, task: "Extract social links to lib/constants.ts", file: "lib/constants.ts" },
  { day: 10, task: "Extract translations to lib/translations.ts", file: "lib/translations.ts" },
  { day: 11, task: "Break page.tsx into smaller components", file: "app/page.tsx" },
  { day: 12, task: "Replace magic numbers with constants", file: "lib/constants.ts" },
  { day: 13, task: "Add TypeScript generics to t function", file: "hooks/use-language.tsx" },
  { day: 14, task: "Remove unused translation keys", file: "hooks/use-language.tsx" },
  { day: 15, task: "Fix ESLint config to flat format", file: "eslint.config.mjs" },
  { day: 16, task: "Add error logging to silent catch blocks", file: "hooks/use-language.tsx" },
  { day: 17, task: "Fix Tailwind content globs", file: "tailwind.config.ts" },
  { day: 18, task: "Fix Node version consistency in workflows", file: ".github/workflows/" },
  { day: 19, task: "Add React error boundary", file: "components/ErrorBoundary.tsx" },
  { day: 20, task: "Fix Image component (sizes, alt)", file: "app/page.tsx" },
  { day: 21, task: "Clean up theme-toggle.tsx (TODO, xmlns)", file: "components/theme-toggle.tsx" },
  { day: 22, task: "Add loading skeleton component", file: "components/LoadingSkeleton.tsx" },
  { day: 23, task: "Verify build passes", file: "package.json" },
  { day: 24, task: "Run npm audit fix", file: "package.json" },
  { day: 25, task: "Final review and cleanup", file: "README.md" },
];

const PROGRESS_FILE = 'REFACTOR_PROGRESS.md';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function readProgress() {
  try {
    const content = fs.readFileSync(PROGRESS_FILE, 'utf8');
    const lines = content.split('\n');
    const done = {};
    for (const line of lines) {
      const m = line.match(/^\d+\.\s+\[(x)\]\s+/);
      if (m) {
        const num = parseInt(line.split('.')[0]);
        done[num] = true;
      }
    }
    return done;
  } catch {
    return {};
  }
}

function writeProgress(done) {
  let content = `# Refactor Progress\n\n`;
  content += `Last updated: ${getToday()}\n\n`;
  for (const item of PLAN) {
    const checked = done[item.day] ? '[x]' : '[ ]';
    content += `${item.day}. ${checked} ${item.task}\n`;
  }
  fs.writeFileSync(PROGRESS_FILE, content);
}

function getNextTask(done) {
  for (const item of PLAN) {
    if (!done[item.day]) return item;
  }
  return null;
}

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function askMiniMax(task, file, fileContent) {
  console.log(`Analyzing: ${task}`);
  console.log(`  File: ${file}`);

  const message = await client.messages.create({
    model: "MiniMax-M2.7",
    max_tokens: 2048,
    messages: [{
      role: "user",
      content: `You are a code refactoring assistant. Your task today:

TASK: ${task}
FILE: ${file}

${fileContent ? `CURRENT FILE CONTENT:\n\`\`\`\n${fileContent.slice(0, 8000)}\n\`\`\`` : 'File does not exist yet - create it.'}

Please:
1. Read the current file content carefully
2. Make the necessary changes to complete the task
3. Return ONLY a JSON response (no markdown, just raw JSON):
{"action": "create|edit|delete|noop", "path": "relative/path/filename", "content": "full file content if create/edit, null otherwise", "summary": "one line description"}

If no changes needed:
{"action": "noop", "path": "", "content": null, "summary": "already correct"}`
    }]
  });

  return message.content[0].text;
}

async function applyChange(action, filePath, content) {
  if (action === 'noop' || action === 'delete') return false;

  const dir = path.dirname(filePath);
  if (dir && dir !== '.') {
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
  console.log(`\nRefactor Agent - ${today}\n`);

  const done = readProgress();
  const task = getNextTask(done);

  if (!task) {
    console.log("All tasks completed!");
    return;
  }

  console.log(`\nDay ${task.day}: ${task.task}`);

  const fileContent = readFileContent(task.file);
  const response = await askMiniMax(task.task, task.file, fileContent);

  let parsed;
  try {
    parsed = JSON.parse(response.trim());
  } catch {
    console.log("Could not parse AI response, skipping...");
    return;
  }

  if (parsed.action && parsed.action !== 'noop') {
    const changed = await applyChange(parsed.action, parsed.path, parsed.content);
    if (changed) {
      console.log(`Done: ${parsed.summary}`);
      done[task.day] = true;
    }
  } else {
    console.log(`No changes: ${parsed.summary || 'already correct'}`);
    done[task.day] = true;
  }

  writeProgress(done);
  console.log(`\nProgress saved to ${PROGRESS_FILE}`);
}

main().catch(e => {
  console.error("Agent Error:", e);
  process.exit(1);
});