const config = {
    mode: '',// "production" | "development" | "none"
    entry: ['./index'],// string | object | array
    entry: ["./app/entry1", "./app/entry2"],
    entry: {
        a: "./app/entry-a",
        b: ["./app/entry-b1", "./app/entry-b2"]
    },
    output: {
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        path: path.resolve(__dirname, "dist"), // string

        filename: "bundle.js", // string
        filename: "[name].js", // 适用于多个入口文件、不同名字
        filename: "[chunkhash].js", // 用于长效缓存

        // 输出解析文件的目录，url 相对于 HTML 页面
        publicPath: "/assets/", // string
        publicPath: "",
        publicPath: "https://cdn.example.com/",

        // 导出库(exported library)的名称
        library: "MyLibrary", // string,

        // 导出库(exported library)的类型
        libraryTarget: "umd", // 通用模块定义
        libraryTarget: "umd2", // 通用模块定义
        libraryTarget: "commonjs2", // exported with module.exports
        libraryTarget: "commonjs-module", // 使用 module.exports 导出
        libraryTarget: "commonjs", // 作为 exports 的属性导出
        libraryTarget: "amd", // 使用 AMD 定义方法来定义
        libraryTarget: "this", // 在 this 上设置属性
        libraryTarget: "var", // 变量定义于根作用域下
        libraryTarget: "assign", // 盲分配(blind assignment)
        libraryTarget: "window", // 在 window 对象上设置属性
        libraryTarget: "global", // property set to global object
        libraryTarget: "jsonp", // jsonp wrapper


        /* 高级输出配置 */

        // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。
        pathinfo: true, // boolean


        // 「附加分块(additional chunk)」的文件名模板
        chunkFilename: "[id].js",
        chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)


        // 用于加载分块的 JSONP 函数名
        jsonpFunction: "myWebpackJsonp", // string


        // 「source map 位置」的文件名模板
        sourceMapFilename: "[file].map", // string
        sourceMapFilename: "sourcemaps/[file].map", // string


        // 「devtool 中模块」的文件名模板
        devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string


        // 「devtool 中模块」的文件名模板（用于冲突）
        devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string


        // 在 UMD 库中使用命名的 AMD 模块
        umdNamedDefine: true, // boolean


        // 指定运行时如何发出跨域请求问题
        crossOriginLoading: "use-credentials", // 枚举
        crossOriginLoading: "anonymous",
        crossOriginLoading: false,


        /* 专家级输出配置（自行承担风险） */

        // 为这些模块使用 1:1 映射 SourceMaps（快速）
        devtoolLineToLine: {
            test: /\.jsx$/
        },


        // 「HMR 清单」的文件名模板
        hotUpdateMainFilename: "[hash].hot-update.json", // string


        // 「HMR 分块」的文件名模板
        hotUpdateChunkFilename: "[id].[hash].hot-update.js", // string


        // 包内前置式模块资源具有更好可读性
        sourcePrefix: "\t", // string


    },
    plugins: [],
    module: {
        rules: [


            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
                // test 和 include 具有相同的作用，都是必须匹配选项
                // exclude 是必不匹配选项（优先于 test 和 include）
                // 最佳实践：
                // - 只在 test 和 文件名匹配 中使用正则表达式
                // - 在 include 和 exclude 中使用绝对路径数组
                // - 尽量避免 exclude，更倾向于使用 include

                issuer: {test, include, exclude},
                // issuer 条件（导入源）

                enforce: "pre",
                enforce: "post",
                // 标识应用这些规则，即使规则覆盖（高级选项）

                loader: "babel-loader",
                // 应该应用的 loader，它相对上下文解析
                // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
                // 查看 webpack 1 升级指南。

                options: {
                    presets: ["es2015"]
                },
                // loader 的可选项
            },

            {
                test: /\.html$/,
                test: "\.html$"

                use: [
                    // 应用多个 loader 和选项
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },

            {oneOf: [/* rules */]},
            // 只使用这些嵌套规则之一

            {rules: [/* rules */]},
            // 使用所有这些嵌套规则（合并可用条件）

            {resource: {and: [/* 条件 */]}},
            // 仅当所有条件都匹配时才匹配

            {resource: {or: [/* 条件 */]}},
            {resource: [/* 条件 */]},
            // 任意条件匹配时匹配（默认为数组）

            {resource: {not: /* 条件 */}}
            // 条件不匹配时匹配
        ],

        /* 高级模块配置（点击展示） */

        noParse: [
            /special-library\.js$/
        ],
        // 不解析这里的模块

        unknownContextRequest: ".",
        unknownContextRecursive: true,
        unknownContextRegExp: /^\.\/.*$/,
        unknownContextCritical: true,
        exprContextRequest: ".",
        exprContextRegExp: /^\.\/.*$/,
        exprContextRecursive: true,
        exprContextCritical: true,
        wrappedContextRegExp: /.*/,
        wrappedContextRecursive: true,
        wrappedContextCritical: false,
// specifies default behavior for dynamic requests
    },
    resolve: {},
    optimization: [],
    performance,
    devtool,
    context,
    target,
    externals,
    serve,
    stats,
    devServer
}

module.exports = config;