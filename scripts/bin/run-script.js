#!/usr/bin/env node

const [taskName, ...taskArgs] = process.argv.slice(2);

async function startTask() {
  /** @type {{ default: import("../types.js").Task }} */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const taskModule = await import(`../tasks/${taskName}.js`);
  await taskModule.default(taskArgs);
}

startTask().catch((err) => {
  console.error('Uncaught error:', err);
  process.exit(1);
});
