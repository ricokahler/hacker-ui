const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const md5 = require('md5');
const generateExports = require('./generateExports');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stdout);
        console.error(stderr);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  await generateExports();

  console.log('linting…');
  const eslintResult = await execute('npx eslint src --ext .ts,.tsx,.js,.jsx');
  eslintResult && console.log(eslintResult);

  console.log('checking types…');
  const tsResult = await execute('npx tsc');
  tsResult && console.log(tsResult);

  console.log('cleaning…');
  const rmRfResult = await execute('rm -rf build');
  rmRfResult && console.log(rmRfResult);

  console.log('rolling…');
  const rollupResult = await execute('npx rollup -c');
  rollupResult && console.log(rollupResult);

  const bundleContent = await readFile(
    path.join(__dirname, '../build/bundle.esm.js'),
  );
  const buildHash = md5(bundleContent.toString()).substring(0, 9);

  console.log('writing build package.json…');
  const rawPackageJson = await readFile(
    path.join(__dirname, '../package.json'),
  );

  const packageJson = JSON.parse(rawPackageJson.toString());
  const {
    private: _private,
    scripts: _scripts,
    devDependencies: _devDependencies,
    version,
    ...restOfPackageJson
  } = packageJson;

  const updatedPackageJson = {
    ...restOfPackageJson,
    version: `0.0.0-${buildHash}`,
    module: './bundle.esm.js',
    main: './bundle.umd.js',
  };

  await writeFile(
    path.join(__dirname, '../build/package.json'),
    JSON.stringify(updatedPackageJson, null, 2),
  );

  console.log('DONE!');
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
