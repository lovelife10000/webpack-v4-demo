const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');

const config = {
    mode: 'development',
    // devtool: "source-map", // enum
    // devtool: "inline-source-map", // 嵌入到源文件中
    // devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
    // devtool: "hidden-source-map", // SourceMap 不在源文件中引用
    // devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
    // devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
    // devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。

    entry: {
        // vendor: Object.keys(package),
        bundle: ["./src/client/index.js"]
    },

    output: {

        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
        chunkFilename: "[name].thunk.js",

    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            // favicon: path.join(__dirname, '../app/assets/images/favicon.ico'),
            title: '',
            template: path.join(__dirname, './src/client/index.html'), // 模板文件
            inject: 'body',
            hash: false, // 为静态资源生成hash值
            minify: { // 压缩HTML文件
                removeComments: false, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
            },
        }),
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "dist"),//不设置的话，会把整个项目的文件给显示出来，这个路径应该和output.path保持一致
        disableHostCheck: true,
        historyApiFallback: true,
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        'ie >= 9',
                                    ],
                                }),
                            ],
                        },
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        'ie >= 9',
                                    ],
                                }),
                            ],
                        },
                    },
                    {
                        loader: "less-loader",
                    },

                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        'ie >= 9',
                                    ],
                                }),
                            ],
                        },
                    },
                    {
                        loader: "sass-loader",
                    },

                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,//打包gif时，需要额外装file-laoder
                use: [

                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,//文件大小小于这个值会被转成base64
                            name: 'images/[hash:8].[name].[ext]',//图片文件的保存路径及名称
                        },
                    },
                    // {
                    //     loader: 'file-loader',//url-loader可以代替它
                    //     options: {
                    //         name: 'images/[hash:8].[name].[ext]',
                    //     },
                    // },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 65,
                                // progressive: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                    {
                                        removeEmptyAttrs: false,
                                    },
                                ],
                            },
                            gifsicle: {
                                // optimizationLevel: 7,
                                // interlaced: false,
                            },
                            webp: {
                                quality: 75
                            },
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[hash:8].[name].[ext]',
                    },
                }],
            },
        ],

    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.sass', '.css', '.png'],
        alias: {
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components'),


        },
    },
    // optimization: {
    //     usedExports: true,
    //     runtimeChunk: {
    //         name: "manifest"
    //     },
    //     splitChunks: {
    //         chunks: "all",
    //         name: true,
    //         cacheGroups: {
    //             default: false,
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "initial",
    //                 name: "vendor",
    //                 maxInitialRequests: 5,
    //             },
    //         }
    //     }
    // },

}

module.exports = config;