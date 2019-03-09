const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');
const testsPath = path.join(__dirname, 'tests');

const cleanEnv = (value, fallback = '') => (value || fallback).trim();

const host = cleanEnv(process.env.HOST || 'localhost');
const port = Number(cleanEnv(process.env.PORT || '3003'));
const baseURL = 'http://localhost/api';

// Export a function in order to change the behavior according the `mode` variable
module.exports = (env, argv) => {
  const mode = argv ? argv.mode : 'production';

  const config = {
    entry: ['@babel/polyfill', './src/index.jsx'],
    mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader', options: { sourceMap: true } }, { loader: 'css-loader' }],
        },
        {
          test: /\.png$/,
          use: [{ loader: 'file-loader' }],
        },
        {
          test: /\.(js|jsx)$/,
          include: [srcPath],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: [srcPath],
          enforce: 'pre',
          loader: 'eslint-loader',
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      path: distPath,
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

  if (mode === 'development') {
    Object.assign(config, {
      devServer: {
        contentBase: './dist',
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        port,
        historyApiFallback: {
          rewrites: [
            // any url will fall back to the index.html to simulate SPA
            { from: /^\/$/, to: '/index.html' },
          ],
        },
      },
      // https://github.com/webpack-contrib/karma-webpack#source-maps
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
      devtool: 'inline-source-map',
    });

    config.optimization.minimize = false;

    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        host,
        port,
        template: 'src/index.ejs',
      }),
      new webpack.HotModuleReplacementPlugin(),
    );
  }
  return config;
};
