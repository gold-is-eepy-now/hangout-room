import { readFile } from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/app.js', 'src/styles.css', 'docs/prototype-scope.md'];

const assertIncludes = (content, needle, file) => {
  if (!content.includes(needle)) {
    throw new Error(`${file} is missing required content: ${needle}`);
  }
};

for (const file of requiredFiles) {
  const content = await readFile(file, 'utf8');
  if (content.trim().length === 0) {
    throw new Error(`${file} is empty`);
  }
}

const html = await readFile('index.html', 'utf8');
assertIncludes(html, '<a-scene', 'index.html');
assertIncludes(html, 'projectile-spawner', 'index.html');
assertIncludes(html, 'portal-toggle', 'index.html');
assertIncludes(html, './src/app.js', 'index.html');

const script = await readFile('src/app.js', 'utf8');
assertIncludes(script, "AFRAME.registerComponent('projectile-spawner'", 'src/app.js');
assertIncludes(script, "AFRAME.registerComponent('portal-toggle'", 'src/app.js');
assertIncludes(script, 'MAX_PROJECTILES', 'src/app.js');

console.log('Static prototype assets validated.');
