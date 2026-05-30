import { execSync } from 'child_process';
import { readFileSync } from 'fs';

/**
 * DevOps agent - handles deployment and monitoring tasks.
 */
export async function deploy() {
  try {
    console.log('Starting deployment...');

    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    console.log(`Deploying version: ${packageJson.version}`);

    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully.');

    return true;
  } catch (error) {
    console.error('Deployment failed:', error.message);
    return false;
  }
}

/**
 * Check system health and resource usage.
 */
export function checkHealth() {
  try {
    const memUsage = process.memoryUsage();
    console.log('System Health:');
    console.log(`  Memory RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
    console.log(`  Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);
    return true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

deploy().catch(console.error);
