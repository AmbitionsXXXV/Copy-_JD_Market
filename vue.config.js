const path = require('path');

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      // 只修改开发环境配置，打包会出现找不到定义的别名的错误
      // return {
      //     resolve: {
      //         alias: {
      //             '@c': path.resolve(__dirname, './src/components/'),
      //             '@css': path.resolve(__dirname, './src/assets/css'),
      //             '@img': path.resolve(__dirname, './src/assets/img'),
      //             '@js': path.resolve(__dirname, './src/assets/js'),
      //         }
      //     }
      // }
    }

    return {
      resolve: {
        alias: {
          '@c': path.resolve(__dirname, './src/components/'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/img'),
          '@js': path.resolve(__dirname, './src/assets/js')
        }
      }
    };
  }
};
