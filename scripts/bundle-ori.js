// @ts-check
import { build } from 'oribuild';
import { findGitRoot } from 'workspace-tools';
import path from 'path';
import { logResult } from './log.js';

const absWorkingDir = findGitRoot(process.cwd());
const pkgRoot = process.cwd();
const pkgRelPath = path.relative(absWorkingDir, pkgRoot).replace(/\\/g, '/');

// This is meant to mimic @ms-cloudpack/bundler-plugin-ori options
/** @type {import('oribuild').BuildOptions} */
const input = {
  absWorkingDir,
  entryPoints: {
    [`${pkgRelPath}/dist-ori/index`]: `${pkgRelPath}/src/index.ts`,
  },
  external: [],
  minify: false,
  incremental: false,
  splitting: true,
  metafile: true,
  write: true,
  serviceOptions: {},
};

const output = await build(input);

logResult(input, output);
