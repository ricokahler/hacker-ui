const { promisify } = require('util');
const glob = promisify(require('glob'));
const createHierarchyFromFileNames = require('./createHierarchyFromFileNames');

async function docFolderLoader() {
  const callback = this.async();
  try {
    const files = await glob(`${this.context}/**/*.{mdx,tsx,js}`);

    for (const file of files) {
      this.addDependency(file);
    }

    const hierarchy = createHierarchyFromFileNames(
      files.map((file) => ({
        path: file,
        value: `%%%%${file}%%%%`,
      })),
    );

    const result = `import React from 'react';\nexport default ${JSON.stringify(
      hierarchy,
    ).replace(/"%%%%([^%]*)%%%%"/g, "React.lazy(() => import('$1'))")}`;

    callback(null, result);
  } catch (e) {
    callback(e);
  }
}

module.exports = docFolderLoader;
