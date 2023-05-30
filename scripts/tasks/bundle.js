import { build } from 'oribuild';

export default async function bundle(additionalArgs = []) {
  const input = {
    absWorkingDir: process.cwd(),
    entryPoints: {
      'index': 'src/index.ts'
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

  console.log(`Input:`, JSON.stringify(input, null, 2));

  const output = await build(input);
  
  output.errors.length && console.log(`Errors:\n`, output.errors.map(friendlyMessage).join('\n'), '');  
  output.warnings.length && console.log(`Warnings:\n`, output.warnings.map(friendlyMessage).join('\n'), '');  
  output.outputFilePaths.length
    ? console.log(`Output files:`, JSON.stringify(output.outputFilePaths, null, 2), '')
    : console.log('No output files');  
}

function friendlyMessage(message) {
  return `Error: ${message.text}${message.location ? ` at ${message.location.file}:${message.location.line}:${message.location.column}` : ''}`;
}