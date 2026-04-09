const fs = require('fs');
const path = require('path');

function removeComments(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove JSX block comments {/* ... */}
  content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  // Remove block comments /* ... */
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove line comments // ... but avoid matches in URLs (http://)
  content = content.replace(/(?<!["':\/\\\-])\/\/.*$/gm, '');

  fs.writeFileSync(filePath, content);
  console.log('Cleaned ' + filePath);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.match(/\.(tsx?|css)$/)) {
      removeComments(fullPath);
    }
  }
}

try {
  walkDir('app');
  walkDir('components');
  console.log('All done!');
} catch (e) {
  console.error(e);
}
