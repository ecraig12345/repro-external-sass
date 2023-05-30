/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import resolve from 'resolve';

const currentPath = path.dirname(fileURLToPath(import.meta.url));

/**
 * Run a script/bin provided by a package in node_modules.
 * @param {object} param0 Params
 * @param {string} param0.packageName Name of package which provides the executable
 * @param {string} [param0.name] `bin` name to run, if different from the package name
 * @param {string[]} [param0.args] Args for the JS program
 * @param {string[]} [param0.nodeArgs] Args for Node itself@
 * @param {Record<string, string>} [param0.variables] Environment variables to set
 * @returns {Promise<void>}
 */
export async function runScript({ packageName, name = packageName, args = [], nodeArgs = [], variables = {} }) {
  // First try to resolve the package, relative to the scripts folder.
  const packageJsonPath = await new Promise((r) =>
    resolve(`${packageName}/package.json`, { basedir: currentPath }, (err, result) => r(result)),
  );

  if (!packageJsonPath) {
    throw new Error(`Unable to resolve package "${packageName}"`);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const binPath =
    typeof packageJson.bin === 'string'
      ? packageJson.bin
      : packageJson.bin?.[name] || Object.values(packageJson.bin || {})[0];
  const scriptPath = path.join(path.dirname(packageJsonPath), binPath);

  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Unable to resolve script "${scriptPath}`);
  }

  const fullArgs = [...nodeArgs, scriptPath, ...args];

  console.log(`Executing: node ${fullArgs.join(' ')}`);

  return new Promise((resolve, reject) => {
    const result = spawn('node', fullArgs, {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: {
        ...process.env,
        ...variables,
      },
    });

    // When the process exits, exit with the same code.
    result.on('exit', (code) => {
      console.log(`Process exited with code ${code}`);
      const exitCode = code || 0;
      process.exitCode = exitCode;

      if (exitCode === 0) {
        resolve();
      } else {
        reject();
      }
    });

    // If the process is killed, kill the child process.
    process.on('SIGINT', () => {
      result.kill('SIGINT');
    });

    result.on('error', (e) => {
      console.error('error!', e);
      process.exitCode = 1;
      reject(e);
    });
  });
}
