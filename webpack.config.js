module.exports = {
  // Otras configuraciones...
  module: {
    rules: [
      {
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@react-three\/drei\/node_modules\/@mediapipe\/tasks-vision/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs']
  }
};