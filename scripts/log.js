const divider = `\n=============================================\n`;

/**
 * @param {import('oribuild').BuildOptions} input
 * @param {import('oribuild').BuildResult} output
 */
export function logResult(input, output) {
  console.log(`Input:${divider}${JSON.stringify(input, null, 2)}\n`);

  output.errors.length &&
    console.log(`Errors:${divider}${output.errors.map(friendlyMessage).join('\n')}`);
  output.warnings.length &&
    console.log(`Warnings:${divider}${output.warnings.map(friendlyMessage).join('\n')}`);
  output.outputFilePaths.length
    ? console.log(`Output files:${divider}${JSON.stringify(output.outputFilePaths, null, 2)}\n`)
    : console.log('No output files');
}

/**
 * @param {import('oribuild').BuildResult['errors'][number]} message
 * @param {number} index
 */
function friendlyMessage(message, index) {
  let msg = `Error ${index + 1}: ${message.text}${
    message.location
      ? ` at ${message.location.file}:${message.location.line}:${message.location.column}`
      : ''
  }\n`;
  if (message.notes) {
    msg = msg + '\n  ' + message.notes.map((note) => note.text).join('\n  ');
  }
  return msg;
}
