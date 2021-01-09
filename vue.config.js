// vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "./dist", // 打包的目录。
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  filenameHashing: true,
  configureWebpack: {
    devtool: "source-map"
    // plugins: [compress]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("css", resolve("src/css"))
      .set("views", resolve("src/views"))
      .set("components", resolve("src/components"))
      .set("js", resolve("src/js"))
  
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options =>
        Object.assign(options, {
          limit: 20000
        })
      );
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "css/base.scss";`
      }
    }
  }
};
