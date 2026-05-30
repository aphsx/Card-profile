import { execSync } from 'child_process';

/**
 * Auto-commit agent - checks for uncommitted changes and commits them.
 * @param {string} message - Optional commit message. If not provided, generates one based on changed files.
 * @param {string} author - Optional author in format "Name <email>".
 */
export async function autoCommit(message, author) {
  try {
    const diff = execSync('git diff --staged', { encoding: 'utf8' });
    if (!diff.trim()) {
      console.log('No staged changes to commit.');
      return false;
    }

    const files = execSync('git diff --staged --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    const commitMessage = message || generateCommitMessage(files);
    const authorArg = author ? [`--author="${author}"`] : [];

    execSync(`git commit -m "${commitMessage}" ${authorArg.join(' ')}`, { stdio: 'inherit' });

    console.log(`Committed: ${commitMessage}`);
    return true;
  } catch (error) {
    console.error('Auto-commit failed:', error.message);
    return false;
  }
}

function generateCommitMessage(files) {
  if (files.length === 1) {
    return `Update ${files[0]}`;
  }
  return `Update ${files.length} files: ${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''}`;
}

autoCommit().catch(console.error);
