const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // {
      //   modules: false,
      //   targets: {
      //     esmodules: true,
      //   },
      // },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@react-style-system/plugin',
      {
        themePath: path.resolve(__dirname, './src/defaultTheme.ts'),
        cacheDir: path.resolve(__dirname, './.cache'),
        moduleResolver: {
          root: [__dirname],
          alias: {
            'hacker-ui': './noop.js',
            [path.resolve(__dirname, './docs')]: './array.js',
          },
        },
      },
    ],
  ],
};
