const configureWebpack = require("./webpack.config");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    css: {
        sourceMap: !isProduction,
        // loaderOptions: {
        //     sass: {
        //         prependData: `@import "~@/public/style/var.scss";`,
        //     },
        //     postcss: {
        //         plugins: [
        //             require("postcss-pxtorem")({
        //                 rootValue: 100, // 换算的基数
        //                 propList: ["*"],
        //             }),
        //         ],
        //     },
        // },
    },
    devServer: {
        clientLogLevel: "warning", //client 控制台显示警告信息
    },
    configureWebpack,
};
