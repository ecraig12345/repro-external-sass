import { build } from 'oribuild';

const divider = `\n=============================================\n`;

export default async function bundle(additionalArgs = []) {
  const input = {
    absWorkingDir: process.cwd(),
    entryPoints: {
      'index': './src/index.ts'
    },
    // This should have worked, but possibly could be resolving relative to process.cwd()
    // absWorkingDir: 'C:\\git\\repro-external-sass',
    // entryPoints: {
    //   'packages/app/lib/index': '.\\packages\\app\\src\\index.ts'
    // },
    outdir: './lib',
    external: [],
    minify: false,
    incremental: false,
    splitting: true,
    metafile: true,
    write: true
  };

  console.log(`Input:${divider}${JSON.stringify(input, null, 2)}\n`);

  const output = await build(input);
  output.errors.length && console.log(`Errors:${divider}${output.errors.map(friendlyMessage).join('\n')}`);  
  output.warnings.length && console.log(`Warningsn${divider}${output.warnings.map(friendlyMessage).join('\n')}`);  
  output.outputFilePaths.length
    ? console.log(`Output files:${divider}${JSON.stringify(output.outputFilePaths, null, 2)}\n`)
    : console.log('No output files');  
}

function friendlyMessage(message, index) {
  return `Error ${index+1}: ${message.text}${message.location ? ` at ${message.location.file}:${message.location.line}:${message.location.column}` : ''}\n`;
}