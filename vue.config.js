const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    publicPath: (process.env.VUE_APP_TYPE === 'admin' && process.env.VUE_APP_ADMIN_HOST === 'sub')
    || (process.env.VUE_APP_TYPE === 'home' && process.env.VUE_APP_HOME_HOST === 'sub') ?
        (process.env.VUE_APP_TYPE === 'admin' ? process.env.VUE_APP_ADMIN_HOST_SUB_PATH : process.env.VUE_APP_HOME_HOST_SUB_PATH) + '/' : '/',
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    },
}
