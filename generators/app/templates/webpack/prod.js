import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import packageConfig from '../package.json';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common, { PATHS } from './common';

export default {
  ...common,
  mode: 'production',
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: MiniCssExtractPlugin
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          "sass-loader"
        ]
      }
    ]
  },
  externals: {
    vue: 'Vue',
    vuex: 'Vuex'
  },
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      title: packageConfig.name,
      template: path.resolve(PATHS.root, 'template.html'),
      inject: false,
      filename: `index.html`,
      isDev: false,
      isProd: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
};
