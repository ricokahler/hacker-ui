const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const createHierarchyFromFileNames = require('./createHierarchyFromFileNames');

async function docFolderLoader() {
  const callback = this.async();
  try {
    const files = await glob(`${this.context}/**/*.mdx`);

    for (const file of files) {
      this.addDependency(file);
    }

    const hierarchy = createHierarchyFromFileNames(
      files.map(file => ({
        path: file,
        component: `____${file}____`,
      })),
    );

    const result = `export default ${JSON.stringify(hierarchy).replace(
      /"____(.*)____"/,
      "require('$1').default",
    )}`;

    callback(null, result);
  } catch (e) {
    callback(e);
  }
}

module.exports = docFolderLoader;
