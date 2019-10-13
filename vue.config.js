const configureAPI = require('./server/configure');

module.exports = {
  devServer: {
    before: configureAPI,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
