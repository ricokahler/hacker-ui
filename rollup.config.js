const typescript = require('@rollup/plugin-typescript');

const input = 'src/index.ts';
const plugins = [typescript()];

module.exports = [
  {
    input,
    output: {
      file: './dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external: [
      'react',
      'classnames',
      'polished',
      'nanoid',
      'react-dom',
      'react-style-system',
    ],
  },
  {
    input,
    output: {
      file: './dist/bundle.umd.js',
      format: 'umd',
      name: 'HackerUI',
      sourcemap: true,
      globals: {
        react: 'React',
        classnames: 'classNames',
        polished: 'polished',
        'react-style-system': 'reactStyleSystem',
        nanoid: 'nanoid',
        'react-dom': 'ReactDOM',
      },
    },
    plugins,
    external: [
      'react',
      'classnames',
      'polished',
      'nanoid',
      'react-dom',
      'react-style-system',
    ],
  },
];
