import packageConfig from '../package.json';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import FallbackPort from 'fallback-port';
import common, { PATHS } from './common';
const defaultPort = 9000;
const fallbackPort = new FallbackPort(defaultPort);

const otherPort = fallbackPort.getPort();
let port = defaultPort;

if (otherPort !== defaultPort) {
  console.log(`${defaultPort} port was occupied, using ${otherPort} instead`);
  port = otherPort;
}

export default {
  ...common,
  mode: 'development',
  devtool: 'sourcemap',
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      }
    ]
  },

  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      title: packageConfig.name,
      template: path.resolve(PATHS.root, 'template.html'),
      inject: false,
      filename: `index.html`,
      isDev: true,
      isProd: false,
    })
  ],
  
  devServer: {
    port,
    stats: "minimal",
  }
};

