const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './docs/index.tsx',
  output: {
    filename: 'hacker-ui-docs.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './docs'),
        ],
        exclude: [path.resolve(__dirname, './node_modules')],
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            jsx: 'react',
            emitDeclarationOnly: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'hacker-ui': path.resolve(__dirname, './src/index.ts'),
    },
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
};
