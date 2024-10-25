const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { assetsPath, resolve } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const env = require('./env.json')

// webpack process.env
const defineEnv = {}
for (const key in env) {
    defineEnv[`process.env.${key}`] = JSON.stringify(env[key])
}

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: resolve("dist"),
        filename: "bundle.[contenthash].js",
    },
    module: {
        rules: [
            ...jsRules,
            ...fileRules,
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            src: resolve('src')
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.webpack.json'),
                extensions: ['.ts', '.tsx', '.js', '.jsx']
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin(defineEnv),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: "body",
        }),
        new TypedCssModulesPlugin({
            globPattern: 'src/**/*.scss'
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash].css'),
            chunkFilename: assetsPath('css/[name].[id].[contenthash].css'),
            ignoreOrder: true
        }),
    ],
    devtool: "source-map",
    devServer: {
        static: resolve("public"),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        open: true,
    },
};
