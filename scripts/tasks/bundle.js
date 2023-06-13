// @ts-check
import { build } from 'oribuild';
import path from "node:path"
import {fileURLToPath} from 'node:url'

const divider = `\n=============================================\n`;

export default async function bundle() {
  // calculate some common build-root
  const buildRoot = path.join(fileURLToPath(import.meta.url), '..', '..', '..')
  const relPath = path.relative(buildRoot , process.cwd())
  const input = /** @type {import('oribuild').BuildOptions} */ ({
    absWorkingDir: buildRoot,
    entryPoints: {
      // make index relative to process.cwd
      'index': path.join(process.cwd(), './src/index.ts')
    },
    // This should have worked, but possibly could be resolving relative to process.cwd()
    // absWorkingDir: 'C:\\git\\repro-external-sass',
    // entryPoints: {
    //   'packages/app/lib/index': '.\\packages\\app\\src\\index.ts'
    // },
    outdir: path.join(relPath, './dist'),
    external: [],
    minify: false,
    incremental: false,
    splitting: true,
    metafile: true,
    write: true,
    serviceOptions: {}
  });

  console.log(`Input:${divider}${JSON.stringify(input, null, 2)}\n`);

  const output = await build(input);
  output.errors.length && console.log(`Errors:${divider}${output.errors.map(friendlyMessage).join('\n')}`);
  output.warnings.length && console.log(`Warningsn${divider}${output.warnings.map(friendlyMessage).join('\n')}`);
  output.outputFilePaths.length
    ? console.log(`Output files:${divider}${JSON.stringify(output.outputFilePaths, null, 2)}\n`)
    : console.log('No output files');
}

function friendlyMessage(message, index) {
  let msg = `Error ${index+1}: ${message.text}${message.location ? ` at ${message.location.file}:${message.location.line}:${message.location.column}` : ''}\n`;
  if (message.notes) {
    msg = msg+ "\n  " + message.notes.map(note => note.text).join('\n  ')
  }
  return msg
}