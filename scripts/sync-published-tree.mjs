import {
  cpSync,
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PRESERVED_WORKFLOW = path.join('.github', 'workflows', 'publish-cold-email-skills.yml');
const PRESERVED_SCRIPTS = new Set([
  'sync-published-tree.mjs',
  'sync-published-tree.test.mjs',
]);
const GENERATED_FILES = new Set(['README.md', 'LICENSE']);

function fail(message) {
  throw new Error(message);
}

function assertSafeTree(root) {
  if (!existsSync(root) || !lstatSync(root).isDirectory()) {
    fail(`tree is not a directory: ${root}`);
  }
  const visit = (current) => {
    for (const name of readdirSync(current)) {
      const child = path.join(current, name);
      const info = lstatSync(child);
      if (info.isSymbolicLink()) fail(`symlink is not allowed: ${path.relative(root, child)}`);
      if (info.isDirectory()) visit(child);
      else if (!info.isFile()) fail(`unsupported filesystem entry: ${path.relative(root, child)}`);
    }
  };
  visit(root);
}

function sourceEntries(sourceDir) {
  const names = readdirSync(sourceDir);
  for (const name of names) {
    if (name.startsWith('.')) fail(`unexpected source path: ${name}`);
    const entry = path.join(sourceDir, name);
    const info = lstatSync(entry);
    if (info.isDirectory()) {
      if (!existsSync(path.join(entry, 'SKILL.md'))) {
        fail(`unexpected source path: ${name}`);
      }
    } else if (!info.isFile() || !GENERATED_FILES.has(name)) {
      fail(`unexpected source path: ${name}`);
    }
  }
  for (const required of GENERATED_FILES) {
    if (!existsSync(path.join(sourceDir, required))) fail(`missing generated file: ${required}`);
  }
  return names;
}

function assertTargetLayout(targetDir, generatedNames) {
  const workflow = path.join(targetDir, PRESERVED_WORKFLOW);
  if (!existsSync(workflow) || !lstatSync(workflow).isFile()) {
    fail(`publisher workflow is missing: ${PRESERVED_WORKFLOW}`);
  }
  const github = path.join(targetDir, '.github');
  const workflows = path.join(github, 'workflows');
  for (const name of readdirSync(github)) {
    if (name !== 'workflows') fail(`unexpected target path: .github/${name}`);
  }
  for (const name of readdirSync(workflows)) {
    if (name !== 'publish-cold-email-skills.yml') {
      fail(`unexpected target path: .github/workflows/${name}`);
    }
  }

  const allowed = new Set(['.git', '.github', ...generatedNames]);
  for (const name of readdirSync(targetDir)) {
    if (name === 'scripts') {
      const scriptsDir = path.join(targetDir, name);
      if (!lstatSync(scriptsDir).isDirectory()) fail(`unexpected target path: ${name}`);
      for (const script of readdirSync(scriptsDir)) {
        if (!PRESERVED_SCRIPTS.has(script)) fail(`unexpected target path: scripts/${script}`);
      }
      continue;
    }
    if (allowed.has(name)) continue;
    const entry = path.join(targetDir, name);
    const info = lstatSync(entry);
    // A stale skill directory is generated content and may be removed.
    if (info.isDirectory() && existsSync(path.join(entry, 'SKILL.md'))) continue;
    fail(`unexpected target path: ${name}`);
  }
}

function generatedSnapshot(targetDir, names) {
  const snapshot = [];
  const visit = (current, relative) => {
    for (const name of readdirSync(current).sort()) {
      const child = path.join(current, name);
      const childRelative = path.join(relative, name);
      const info = lstatSync(child);
      if (info.isDirectory()) visit(child, childRelative);
      else snapshot.push([childRelative, info.mode, requireBytes(child)]);
    }
  };
  for (const name of names.sort()) {
    const entry = path.join(targetDir, name);
    if (!existsSync(entry)) continue;
    if (lstatSync(entry).isDirectory()) visit(entry, name);
    else snapshot.push([name, lstatSync(entry).mode, requireBytes(entry)]);
  }
  return JSON.stringify(snapshot);
}

function requireBytes(file) {
  return Buffer.from(readFileSync(file)).toString('base64');
}

export { assertSafeTree, synchronizePublishedTree };

function synchronizePublishedTree({ sourceDir, targetDir }) {
  assertSafeTree(sourceDir);
  assertSafeTree(targetDir);
  const sourceNames = sourceEntries(sourceDir);
  assertTargetLayout(targetDir, sourceNames);
  const generatedNames = [...new Set([...sourceNames, ...readdirSync(targetDir).filter((name) =>
    !name.startsWith('.') && existsSync(path.join(targetDir, name)) && lstatSync(path.join(targetDir, name)).isDirectory() &&
    existsSync(path.join(targetDir, name, 'SKILL.md'))
  )])];
  const before = generatedSnapshot(targetDir, generatedNames);

  for (const name of generatedNames) {
    const targetEntry = path.join(targetDir, name);
    if (existsSync(targetEntry)) rmSync(targetEntry, { recursive: true, force: true });
  }
  for (const name of sourceNames) {
    cpSync(path.join(sourceDir, name), path.join(targetDir, name), { recursive: true });
  }

  const after = generatedSnapshot(targetDir, generatedNames);
  return { changed: before !== after };
}

function parseArgs(argv) {
  const values = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--source-dir') values.sourceDir = argv[++i];
    else if (arg === '--target-dir') values.targetDir = argv[++i];
    else fail(`unknown argument: ${arg}`);
  }
  if (!values.sourceDir || !values.targetDir || argv.length !== 4) {
    fail('usage: sync-published-tree.mjs --source-dir DIR --target-dir DIR');
  }
  return values;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { sourceDir, targetDir } = parseArgs(process.argv.slice(2));
  const result = synchronizePublishedTree({ sourceDir: path.resolve(sourceDir), targetDir: path.resolve(targetDir) });
  console.log(result.changed ? 'Published tree changed.' : 'Published tree already current.');
}
