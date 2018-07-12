const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 独立css文件

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name]-[chunkhash].js'
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {}
    },
    module: {
        rules: [
            // react 语法处理
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,  //对这里面的文件不做处理
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // scss文件的处理
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 图片配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resoure/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体配置
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resoure/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理HTML文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin("css/[chunkhash]-css.css"),
        new ExtractTextPlugin("css/[chunkhash]-sass.css")
    ],
    //optimization与entry/plugins同级
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
        //contentBase:'./dist'
        port: 7000,
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                secure:false,
                changeOrigin: true//,
                //pathRewrite: {"^/api" : "/SSM"}//这里把/api换成/SSM
            }
        },
        historyApiFallback: {
            index: '/dist/index.html'
        }
    }
};