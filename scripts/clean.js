const fs = require('fs');
const path = require('path');

const TARGETS = ['.strapi', 'dist', 'node_modules/.cache', 'node_modules/.strapi'];

let removed = 0;
for (const target of TARGETS) {
  const fullPath = path.join(process.cwd(), target);
  try {
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`  ✔ Removed ${target}`);
      removed++;
    }
  } catch (err) {
    console.warn(`  ⚠ Could not remove ${target}: ${err.message}`);
  }
}

if (removed === 0) {
  console.log('  Nothing to clean — all caches already cleared.');
} else {
  console.log(`\n  Cleaned ${removed} target(s). Run "npm run develop" to rebuild.`);
}
