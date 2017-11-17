const webpack = require("webpack");
const path = require("path");


module.exports = {
    resolve: {
        extensions: [".js", ".jsx"],
    },
    entry:   [
      "./server.js" // the entry point of our app
    ],
    output:  {
        filename:   "server.js", // the output bundle
        path:       path.join(__dirname, "dist")
    },

    context:  path.join(__dirname, "src"),
    devtool: "inline-source-map",


    module: {
        rules: [
            {
                test:    /\.(js|jsx)$/,
                loader:     "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader:  'ignore-loader',
            },
            {
                test:    /\.scss$/,
                loader: 'ignore-loader'
            },
            {
                test:    /\.(jpe?g|png|gif|svg|ttf|woff|eot)$/i,
                loader: 'ignore-loader'
            }
        ],
    },

    plugins:     [
        new webpack.NamedModulesPlugin()

    ],
    target: 'node',
    node: {
         fs: 'empty',
         __dirname: false,
         __filename: false
    }
};
