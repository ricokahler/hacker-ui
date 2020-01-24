const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './website/index.tsx',
  output: {
    filename: 'hacker-ui-docs.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.doc-folder$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './docs'),
          path.resolve(__dirname, './website'),
        ],
        use: [
          'babel-loader',
          { loader: path.resolve(__dirname, './loaders/doc-folder-loader.js') },
        ],
      },
      {
        test: /\.mdx$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './docs'),
          path.resolve(__dirname, './website'),
        ],
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './docs'),
          path.resolve(__dirname, './website'),
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
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mdx', '.doc-folder'],
    alias: {
      'hacker-ui': path.resolve(__dirname, './src/index.ts'),
    },
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({})],
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
};
