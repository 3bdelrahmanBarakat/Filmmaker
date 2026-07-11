const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building yousef-sediq for Vercel...');

try {
  // Run pnpm build to build all artifacts
  console.log('📦 Running build...');
  execSync('pnpm build', { stdio: 'inherit' });

  // Copy yousef-sediq dist to public
  const sourceDir = path.join(__dirname, '..', 'artifacts', 'yousef-sediq', 'dist');
  const targetDir = path.join(__dirname, '..', 'public');

  console.log(`📁 Copying ${sourceDir} to ${targetDir}...`);

  // Remove target if it exists
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  // Copy source to target
  fs.cpSync(sourceDir, targetDir, { recursive: true });

  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
