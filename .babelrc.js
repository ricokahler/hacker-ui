const path = require('path');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    '@react-style-system/plugin',
    {
      themePath: path.resolve(__dirname, './src/defaultTheme.ts'),
      moduleResolver: {
        root: [__dirname],
        alias: {
          'hacker-ui': require.resolve('./noop.js'),
          [path.resolve(__dirname, './docs')]: require.resolve('./array.js'),
        },
      },
    },
  ]);
}

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins,
};
