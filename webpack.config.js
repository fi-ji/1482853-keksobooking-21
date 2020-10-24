const path = require('path');

module.exports = {
  entry: [
    './js/load.js',
    './js/util.js',
    './js/map.js',
    './js/form.js',
    './js/form-preview.js',
    './js/move.js',
    './js/pin.js',
    './js/card.js',
    './js/filter.js',
    './js/render.js',
    './js/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
