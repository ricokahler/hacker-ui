import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      file: './dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modulesOnly: true,
      }),
      babel({
        babelrc: false,
        babelHelpers: 'runtime',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        presets: [
          ['@babel/preset-env', { targets: '> 5% and not IE 11' }],
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
    ],
    external: [
      'react',
      'classnames',
      'uid',
      'react-dom',
      'react-style-system',
      /^@babel\/runtime/,
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
        'react-style-system': 'reactStyleSystem',
        uid: 'uid',
        'react-dom': 'ReactDOM',
      },
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modulesOnly: true,
      }),
      babel({
        babelrc: false,
        babelHelpers: 'bundled',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        presets: [
          ['@babel/preset-env', { targets: 'defaults, not IE 11' }],
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
      }),
    ],
    external: [
      'react',
      'classnames',
      'uid',
      'react-dom',
      'react-style-system',
    ],
  },
];
