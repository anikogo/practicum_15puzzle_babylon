import path from 'path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

type Environment = 'development' | 'production' | 'none' | undefined;

const common = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules'],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
};

const client = merge<Configuration>(common, {
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV as Environment ?? 'development',
  devtool: 'inline-source-map',
  entry: ['./src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin()],
  },
});

const server = merge<Configuration>(common, {
  name: 'server',
  target: 'node',
  entry: ['./src/server/index.ts'],
  mode: process.env.NODE_ENV as Environment ?? 'development',
  externals: [
    nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] }),
  ],
  plugins: [
    new NodemonPlugin({
      script: './dist/server',
      watch: ['./dist'],
      delay: 1000,
      verbose: true,
      env: {
        NODE_ENV: 'development',
      },
    }),
  ],
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['null-loader'],
      },
    ],
  },
});

// const sw = merge<Configuration>(common, {
//   name: 'sw',
//   target: 'web',
//   mode: process.env.NODE_ENV as Environment ?? 'development',
//   devtool: 'inline-source-map',
//   entry: ['./src/service-worker/service-worker.js'],
//   output: {
//     filename: 'service-worker/service-worker.js',
//     path: path.join(__dirname, 'dist'),
//   },
//   optimization: {
//     minimize: process.env.NODE_ENV === 'production',
//     minimizer: [new TerserPlugin()],
//   },
// });

export default [client, server];
