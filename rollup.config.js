const typescript = require('@rollup/plugin-typescript');

const input = 'src/index.ts';
const plugins = [typescript()];

module.exports = [
  {
    input,
    output: {
      file: './build/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: './build/bundle.umd.js',
      format: 'umd',
      name: 'HackerUI',
      sourcemap: true,
    },
    plugins,
  },
];
