const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const typescript = require('typescript');

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

    const compiledExample = typescript.transpileModule(exampleContent, {
      compilerOptions: {
        jsx: 'react',
        module: 'commonjs',
        target: 'es2015',
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    }).outputText;

    const exampleComponent = `(() => {
        const example = {};
        ((exports) => {${compiledExample}})(example);
        return example.default;
      })()`;

    const result = typescript.transpileModule(
      `
        import React from 'react';
        import CodeExample from 'website/CodeExample';

        const Example = ${exampleComponent};
        const javascriptCode = ${JSON.stringify(javascriptSource)};
        const typescriptCode = ${JSON.stringify(typescriptSource)};

        function CodeExampleSection({ children, ...restOfProps}) {
          return <CodeExample
            javascriptCode={javascriptCode}
            typescriptCode={typescriptCode}
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
          module: 'commonjs',
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
