const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

console.log('isDev',isDev)
console.log('isProd',isProd)

module.exports = {
    context: path.resolve(__dirname, 'src'), // Нота делает абсолютный путь к папке проекта и конкатинирует с src
    mode: 'development',
    entry: './index.ts',
    output: {
        filename: 'bundle.[hash].js', // Хеши нужно подставлять, чтоб браузер понимал какие файлы изменились, и делал перезагрузку.
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Идет с последнего к первому. Сначала scss=>css=>js=>bundle.[hash].css
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
