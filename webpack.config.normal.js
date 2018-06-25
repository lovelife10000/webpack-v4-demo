const path = require('path');
const package=require('./package.json')

const config = {
    mode: 'development',
    devtool: "source-map", // enum
    devtool: "inline-source-map", // 嵌入到源文件中
    devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
    devtool: "hidden-source-map", // SourceMap 不在源文件中引用
    devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
    devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
    devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。

    entry: {
        vendor: Object.keys(package),
        bundle: ["./app/entry-b1", "./app/entry-b2"]
    },

    output: {

        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
        chunkFilename: "[name].thunk.js",

    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '[hash:8].style.css',
            disable: false,
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../app/assets/images/favicon.ico'),
            title: '',
            template: path.join(__dirname, '../app/assets/index.ejs'), // 模板文件
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
                test: /\.vue$/,
                use: ['vue-loader'],
                include: path.join(__dirname, '../app'),

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.less$/,
                include: path.join(__dirname, '..'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            ignoreOrder: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            getLocalIdent: (context, localIdentName, localName, options) => localName,
                        },
                    }, {
                        loader: 'postcss-loader',
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
                            loader: 'less-loader',
                        }],

                }),
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[hash:8].[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 65,
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
                                optimizationLevel: 7,
                                interlaced: false,
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

            assets: path.resolve(__dirname, '../app/assets'),
            utils: path.resolve(__dirname, '../app/utils'),
            config: path.resolve(__dirname, '../app/config'),
            components: path.resolve(__dirname, '../app/components'),
            store: path.resolve(__dirname, '../app/store'),
            api: path.resolve(__dirname, '../app/api'),
            filters: path.resolve(__dirname, '../app/filters'),
            validators: path.resolve(__dirname, '../app/validators'),

        },
    },
    optimization: {
        usedExports: true,
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            chunks: "all",
            name: true,
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendor",
                    maxInitialRequests: 5,
                },
            }
        }
    },

}

module.exports = config;