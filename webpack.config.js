const HtmlWebpack = require ('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    entry:{
        index: './src/index.js',
        jquery: './src/js/jquery.min.js'
    },
    output: {
        clean: true,
    },

    module: {
        rules: [

            {
                test: /\.css$/,
                exclude: [/styles.css$/, /mapas.css$/, /login.css$/, /loader.css$/, /pay.css$/, /all.css$/], 
                use : ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader',]
            },
            {
                test: /mapas.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /login.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /loader.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /pay.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /all.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.(png|jpe?|gif)$/,
                loader: 'file-loader'
           }

        ]
    },
    plugins: [
        new HtmlWebpack({
            title: 'index',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index', 'jquery']
        }),
        new HtmlWebpack({
            title: 'details',
            template: './src/details.html',
            filename: 'details.html',
            chunks: ['index', 'jquery']
        }),
        new MiniCssExtract({
            filename: 'styles.css',
            ignoreOrder: false
        }),
        new MiniCssExtract({
            filename: 'loader.css',
            ignoreOrder: false
        }),
        new MiniCssExtract({
            filename: 'mapas.css',
            ignoreOrder: false
        }),
        new MiniCssExtract({
            filename: 'login.css',
            ignoreOrder: false
        }),
        new MiniCssExtract({
            filename: 'pay.css',
            ignoreOrder: false
        }),
        new MiniCssExtract({
            filename: 'all.css',
            ignoreOrder: false
        }),
        new CopyPlugin ({
            patterns: [{ from: 'src/img/', to: 'img/'}],
        })
    ]
}
