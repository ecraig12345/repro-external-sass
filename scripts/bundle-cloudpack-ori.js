import ori from '@ms-cloudpack/bundler-plugin-ori';
import { logResult } from './log.js';

const pkgRoot = process.cwd();

const output = await ori.bundle({
  inputPath: pkgRoot,
  entries: {
    'dist-cloudpack/index': './src/index.ts',
  },
});

logResult(/** @type {*} */ (output.rawInput), /** @type {*} */ (output.rawOutput));
