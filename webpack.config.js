const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: './script.js',
    output: {
        filename: `./${filename('js')}`,
        path: path.resolve(__dirname, 'WebpackEditor'),
    },

devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'WebpackEditor'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
},

plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        minify: {
            collapseWhitespace: isProd
        }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: `./${filename('css')}`
    }),
],
module: {
    rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
    ]
}

};