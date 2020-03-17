const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const typescript = require('typescript');
const loaderUtils = require('loader-utils');
const { createFilenameHash } = require('@react-style-system/common');

async function exampleLoader(exampleContent) {
  const callback = this.async();

  try {
    const prettierConfig = JSON.parse(
      (
        await fs.promises.readFile(path.resolve(__dirname, '../.prettierrc'))
      ).toString(),
    );

    function format(code) {
      return prettier.format(code, { ...prettierConfig, parser: 'typescript' });
    }

    const typescriptSource = format(exampleContent);
    const javascriptSource = format(
      typescript.transpileModule(exampleContent, {
        compilerOptions: {
          jsx: 'preserve',
          module: 'esnext',
          target: 'esnext',
        },
      }).outputText,
    );

    const { cacheDir } = loaderUtils.getOptions(this);
    const extname = path.extname(this.resourcePath);
    const filename = path.join(
      cacheDir,
      `${createFilenameHash(this.resourcePath)}${extname}`,
    );

    // not the best solution for this but it works for now
    await fs.promises.writeFile(filename, exampleContent);

    const jsFilename = path.join(
      cacheDir,
      `${createFilenameHash(this.resourcePath)}-example-js.js`,
    );
    await fs.promises.writeFile(
      jsFilename,
      `export default ${JSON.stringify(javascriptSource)}`,
    );

    const tsFilename = path.join(
      cacheDir,
      `${createFilenameHash(this.resourcePath)}-example-ts.js`,
    );
    await fs.promises.writeFile(
      tsFilename,
      `export default ${JSON.stringify(typescriptSource)}`,
    );

    const result = typescript.transpileModule(
      `
        import React from 'react';
        import CodeExample from 'website/CodeExample';

        import Example from ${JSON.stringify(filename)}

        function CodeExampleSection({ children, ...restOfProps}) {
          return <CodeExample
            javascriptCodePromise={import(${JSON.stringify(jsFilename)})}
            typescriptCodePromise={import(${JSON.stringify(tsFilename)})}
            {...restOfProps}
          >
            <Example />
          </CodeExample>
        }

        export default CodeExampleSection;
      `,
      {
        compilerOptions: {
          jsx: 'react',
          module: 'esnext',
          target: 'es2015',
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
        },
      },
    ).outputText;

    callback(null, result);
  } catch (e) {
    callback(e);
  }
}

module.exports = exampleLoader;
