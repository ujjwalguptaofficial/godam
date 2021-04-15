const path = require('path');
const SmartBannerPlugin = require('smart-banner-webpack-plugin');
const banner = require('../build_helper/licence');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [{
    name: "godam",
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    mode: 'none',
    resolve: {
        extensions: ['.ts', '.js'] // '' is needed to find modules like "jquery"
    },
    plugins: [
        new SmartBannerPlugin(banner),
        new CopyPlugin({
            patterns: [
                { from: path.resolve('build_helper', 'npm.export.js'), to: '' },
            ],
        }),
    ]
}];