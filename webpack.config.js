const path = require("path");

module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "initial",
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: "all",
                    reuseExistingChunk: true,
                },
            },
        },
    }, //打包策略
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }, //别名
        extensions: [".scss"],
    },
};
