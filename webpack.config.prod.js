const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const SpritesmithPlugin = require('webpack-spritesmith');

const config = {
    mode: 'development',//debugger会被忽略掉
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
        path: path.resolve(__dirname, "dist"),// 所有输出文件的目标路径，必须是绝对路径（使用 Node.js 的 path 模块）
        filename: "[name].js",
        publicPath: "/",//给打包后的css文件中引用了图片的地址的前缀
        chunkFilename: "[name].thunk.js",
    },
    plugins: [
        new MiniCssExtractPlugin({//提取css到文件中
            filename: "[name].css",//name取决于entry键值名
            chunkFilename: "[id].css"//如果css分包了，那么chunk名字是
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/assets/images'),  //准备合并成sprit的图片存放文件夹
                glob: '*.png'  //哪类图片
            },
            target: {
                image: path.resolve(__dirname, 'dist/images/sprites.png'),  // sprite图片保存路径
                css: path.resolve(__dirname, 'dist/_sprites.scss')  // 生成的sass保存在哪里
            },
            apiOptions: {
                cssImageRef: "~sprite.png" //css根据该指引找到sprite图
            }
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
                                require('postcss-plugin-px2rem')({
                                    // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                    // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                    //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                    // propBlackList: [], //黑名单
                                    exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                    // selectorBlackList: [], //要忽略并保留为px的选择器
                                    // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                    // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                    mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                                    minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
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
                                require('postcss-plugin-px2rem')({
                                    // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                    // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                    //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                    // propBlackList: [], //黑名单
                                    exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                    // selectorBlackList: [], //要忽略并保留为px的选择器
                                    // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                    // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                    mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                                    minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
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
                                require('postcss-plugin-px2rem')({
                                    // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                    // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                    //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                    // propBlackList: [], //黑名单
                                    exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                    // selectorBlackList: [], //要忽略并保留为px的选择器
                                    // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                    // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                    mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                                    minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
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
        extensions: ['.js', '.jsx', '.vue', '.sass', '.css', '.png', '.less'],
        alias: {//css文件中图片src使用alias要加～,css中使用@import也要加～
            components: path.resolve(__dirname, './src/components'),
            assets: path.resolve(__dirname, './src/assets'),
            client: path.resolve(__dirname, './src/client'),
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