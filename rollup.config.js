const typescript = require('@rollup/plugin-typescript');

const input = 'src/index.ts';
const plugins = [typescript()];

module.exports = [
  {
    input,
    output: {
      file: './build/bundle.esm.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input,
    output: {
      file: './build/bundle.umd.js',
      format: 'umd',
      name: 'HackerUi',
    },
    plugins,
  },
];
