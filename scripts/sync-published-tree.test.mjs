import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  synchronizePublishedTree,
  assertSafeTree,
} from './sync-published-tree.mjs';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'cold-email-publisher-'));
  const source = path.join(root, 'build');
  const target = path.join(root, 'target');
  mkdirSync(path.join(source, 'search-strategy'), { recursive: true });
  mkdirSync(path.join(target, '.github', 'workflows'), { recursive: true });
  mkdirSync(path.join(target, 'scripts'), { recursive: true });
  mkdirSync(path.join(target, 'old-skill'), { recursive: true });
  writeFileSync(path.join(source, 'search-strategy', 'SKILL.md'), 'new skill\n');
  writeFileSync(path.join(source, 'README.md'), 'new readme\n');
  writeFileSync(path.join(source, 'LICENSE'), 'MIT\n');
  writeFileSync(path.join(target, 'old-skill', 'SKILL.md'), 'old\n');
  writeFileSync(path.join(target, 'README.md'), 'published readme\n');
  writeFileSync(path.join(target, 'LICENSE'), 'published license\n');
  writeFileSync(path.join(target, '.github', 'workflows', 'publish-cold-email-skills.yml'), 'publisher\n');
  writeFileSync(path.join(target, 'scripts', 'sync-published-tree.mjs'), 'publisher script\n');
  writeFileSync(path.join(target, 'scripts', 'sync-published-tree.test.mjs'), 'publisher tests\n');
  return { root, source, target };
}

test('synchronize replaces only generated content and preserves the publisher workflow', () => {
  const { source, target } = fixture();
  const result = synchronizePublishedTree({ sourceDir: source, targetDir: target });

  assert.equal(result.changed, true);
  assert.equal(readFileSync(path.join(target, 'search-strategy', 'SKILL.md'), 'utf8'), 'new skill\n');
  assert.equal(readFileSync(path.join(target, 'README.md'), 'utf8'), 'new readme\n');
  assert.equal(existsSync(path.join(target, 'old-skill')), false);
  assert.equal(
    readFileSync(path.join(target, '.github', 'workflows', 'publish-cold-email-skills.yml'), 'utf8'),
    'publisher\n',
  );
  assert.equal(synchronizePublishedTree({ sourceDir: source, targetDir: target }).changed, false);
});

test('synchronize rejects unexpected target paths before changing anything', () => {
  const { source, target } = fixture();
  writeFileSync(path.join(target, 'unexpected.txt'), 'do not touch\n');
  assert.throws(
    () => synchronizePublishedTree({ sourceDir: source, targetDir: target }),
    /unexpected target path/,
  );
  assert.equal(existsSync(path.join(target, 'old-skill')), true);
});

test('synchronize rejects symlinks in source and target trees', () => {
  const sourceFixture = fixture();
  symlinkSync(path.join(sourceFixture.source, 'README.md'), path.join(sourceFixture.source, 'link'));
  assert.throws(() => assertSafeTree(sourceFixture.source), /symlink/);

  const targetFixture = fixture();
  symlinkSync(path.join(targetFixture.target, 'old-skill'), path.join(targetFixture.target, 'link'));
  assert.throws(
    () => synchronizePublishedTree({ sourceDir: targetFixture.source, targetDir: targetFixture.target }),
    /symlink/,
  );
  assert.equal(lstatSync(path.join(targetFixture.target, 'link')).isSymbolicLink(), true);
});

test('synchronize rejects unexpected source paths', () => {
  const { source, target } = fixture();
  writeFileSync(path.join(source, 'unexpected.txt'), 'do not publish\n');
  assert.throws(
    () => synchronizePublishedTree({ sourceDir: source, targetDir: target }),
    /unexpected source path/,
  );
});

test('synchronize rejects reserved source skill roots before replacing the publisher', () => {
  const { source, target } = fixture();
  mkdirSync(path.join(source, 'scripts'), { recursive: true });
  writeFileSync(path.join(source, 'scripts', 'SKILL.md'), 'malicious publisher replacement\n');

  assert.throws(
    () => synchronizePublishedTree({ sourceDir: source, targetDir: target }),
    /reserved source path: scripts/,
  );
  assert.equal(readFileSync(path.join(target, 'scripts', 'sync-published-tree.mjs'), 'utf8'), 'publisher script\n');
  assert.equal(existsSync(path.join(target, 'old-skill')), true);
});

test('synchronize rejects a non-file preserved README before deleting generated content', () => {
  const { source, target } = fixture();
  rmSync(path.join(target, 'README.md'));
  mkdirSync(path.join(target, 'README.md'));

  assert.throws(
    () => synchronizePublishedTree({ sourceDir: source, targetDir: target }),
    /preserved target file is not a regular file: README\.md/,
  );
  assert.equal(existsSync(path.join(target, 'old-skill')), true);
  assert.equal(lstatSync(path.join(target, 'README.md')).isDirectory(), true);
});

test('synchronize rejects a symlink preserved LICENSE before deleting generated content', () => {
  const { source, target } = fixture();
  rmSync(path.join(target, 'LICENSE'));
  symlinkSync(path.join(target, 'README.md'), path.join(target, 'LICENSE'));

  assert.throws(
    () => synchronizePublishedTree({ sourceDir: source, targetDir: target }),
    /symlink is not allowed: LICENSE/,
  );
  assert.equal(existsSync(path.join(target, 'old-skill')), true);
  assert.equal(lstatSync(path.join(target, 'LICENSE')).isSymbolicLink(), true);
});

test('workflow is scheduled, manually dispatchable, and uses only target contents write', () => {
  const workflow = readFileSync('.github/workflows/publish-cold-email-skills.yml', 'utf8');
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /contents:\s*write/);
  assert.match(workflow, /Ken-Technology\/ken-ai-plugin/);
  assert.match(workflow, /path: target/);
  assert.match(workflow, /path: source/);
  assert.match(workflow, /node --test scripts\/build-free\.test\.mjs/);
  assert.match(workflow, /node scripts\/build-free\.mjs --out/);
  assert.match(workflow, /sync-published-tree\.mjs/);
  assert.doesNotMatch(workflow, /COLD_EMAIL_SKILLS_DEPLOY_KEY|secrets\.|--force|force-push/);
});
