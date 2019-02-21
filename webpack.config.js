const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['dist'];
const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
};

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/js', 'main'),
  watch: true,
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: "bundle.js",
  },
  module: {
    rules: [{
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ["@babel/env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyPlugin([{
      from: 'src/img/',
      to: 'img/'
    }, ]),
  ],
};
