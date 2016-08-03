module.exports = {
  entry: './examples/example_1/index.js',
  output: {
    path: './examples/example_1',
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
