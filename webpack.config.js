const tsconfig = require('./tsconfig.json')

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const tsAliases = tsconfig.compilerOptions.paths
const getFileName = extension => isDevelopment ? `bundle.${extension}` : `bundle.[hash].${extension}`; // Хеши нужно подставлять, чтоб браузер понимал какие файлы изменились, и делал перезагрузку.

const getAliases = () => Object.keys(tsAliases).reduce((acc, item) => {
  const key = item.replace("/*", "");
  const value = tsAliases[item].join().replace("/*", "")
  acc[key] = path.resolve(__dirname,value);
  return acc;
}, {});

const getJSLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  }];
  if (isDevelopment) {
    const developLoaders = [
      {
        loader: 'eslint-loader',
      },
    ];

    loaders.push(...developLoaders);
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'), // Нода делает абсолютный путь к папке проекта и конкатинирует с src
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: getAliases()
  },
  devtool: isDevelopment ? 'source-map' : false,
  devServer: {
    port: 3000,
    https: true,
    hot: isDevelopment,
    devMiddleware: {
      writeToDisk: true, // отображать папку dist при разработке, т.к. по умолчанию webpack-dev-server ее дропает
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Идет с последнего к первому. Сначала scss=>css=>js=>bundle.[hash].css
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: getJSLoaders(),
      },
    ],
  },
};
