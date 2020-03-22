const path = require('path');

module.exports = {
  presets: [
    '@babel/preset-env',
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
            'hacker-ui': require.resolve('./noop.js'),
            [path.resolve(__dirname, './docs')]: require.resolve('./array.js'),
          },
        },
      },
    ],
  ],
};
