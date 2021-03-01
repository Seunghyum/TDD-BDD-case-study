const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const baseConfig = require('./webpack.config.common');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: '/dist/',
  },
  plugins: [new HotModuleReplacementPlugin()],
});
