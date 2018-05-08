import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import glob from 'glob';
import path from 'path';
import packageConfig from '../package.json';

const root = path.resolve(__dirname, '..');

export const PATHS = {
  root,
  src: path.resolve(root, 'src'),
  build: path.resolve(root, 'build'),
  assets: path.resolve(root, 'assets'),
  demo: path.resolve(root, 'demo'),
};

export default {
  entry: path.resolve(PATHS.demo, 'index.js'),
  output: {
    path: PATHS.build,
    filename: 'index.js'
  },
  resolve: {
    alias: {
      '@': PATHS.src,
      '@components': path.resolve(PATHS.src, 'components'),
      '@utils': path.resolve(PATHS.src, 'utils'),
      '@assets': path.resolve(PATHS.src, 'assets'),
      '@store': path.resolve(PATHS.src, 'store'),
      'colors': path.resolve(PATHS.src, 'colors.scss'),
    },
    extensions: [ ".js", ".json", ".vue" ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeDoctype: true },
              { removeComments: true }
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
