const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/avatar-vue/',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // https: true
  }
});
