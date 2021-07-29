/*
 * :file description: 
 * :name: /webpack/webpack.config.js
 * :author: 胡东亮
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-26 13:47:27
 * :last editor: 胡东亮
 * :date last edited: 2021-07-27 11:52:12
 */
var HelloWorldPlugin = require('./plugin/hello-world.js');
module.exports = {
    mode: 'development', // development, production
    entry: './demo/index.js',
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'babel-loader',
                  }
                ],
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "replace-loader",
                        options: {
                            name: "xxxx"
                        }
                }
                ],
            },
        ]
    },
    resolveLoader: {
        modules: ["./node_modules", "./loader"], 
    },
    plugins: [
        new HelloWorldPlugin({options: true})
    ]
}