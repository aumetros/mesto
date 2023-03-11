const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {    
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: ''
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
  
};