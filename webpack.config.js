var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/js',
  target: 'node',
  entry: [
    'babel-polyfill',
    'views/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.html'],
    modulesDirectories: ['js', 'node_modules']
  },
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
  plugins: [
    new webpack.DefinePlugin({
      global: {}
    })
  ]
};
