import { cp, mkdir, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = join(projectRoot, 'src');
const outputRoot = join(projectRoot, 'out');

await mkdir(outputRoot, { recursive: true });
for (const entry of await readdir(sourceRoot)) {
  await cp(join(sourceRoot, entry), join(outputRoot, entry), { recursive: true, force: true });
}
