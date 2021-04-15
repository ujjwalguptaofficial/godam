const webpack = require("webpack");
const path = require("path");
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        frameworks: ["mocha"],
        // frameworks: ["mocha", 'chai'],

        // plugins: ['karma-chai'],
        files: [
            // "src/**/*.ts",
            "spec/index.spec.ts" // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": "webpack",
            "**/*.js": "webpack"
        },
        webpack: webpackConfig,
        client: {
            mocha: {
                timeout: 5000
            }
        },
        reporters: ["mocha"],
        // browsers: ["jsdom"],
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['HeadlessChrome'],
        customLaunchers: {
            HeadlessChrome: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions'
                ]
            }
        },
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        browserNoActivityTimeout: 20000,
    });
};

var webpackConfig = {
    mode: "development",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin/')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': "'test'"
        })
    ],
    devtool: 'inline-source-map'
};