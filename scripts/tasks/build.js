import path from 'path';
import fs from 'fs';
import { runScript } from '../runScript.js';

/** @type {import("../types.js").Task} */
export default function build(additionalArgs = []) {
  const outDir = 'lib';
  fs.removeSync(path.join(process.cwd(), outDir));

  return runScript({
    packageName: 'typescript',
    name: 'tsc',
    // --pretty must be manually specified when running programmitically
    // (it's not respected from the config)
    args: ['-p', 'tsconfig.json', '--outDir', outDir, '--pretty', ...additionalArgs],
  });
}
