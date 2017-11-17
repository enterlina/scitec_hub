const webpack = require("webpack");
const path = require("path");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
    resolve: {
        extensions: [".js", ".jsx"],
    },
    entry:   [
      "./index.js" // the entry point of our app
    ],
    output:  {
        filename:   "bundle.js", // the output bundle
        path:       path.join(__dirname, "dist")
    },

    context:  path.join(__dirname, "src"),
    devtool: "inline-source-map",


    module: {
        rules: [
            {
                test:    /\.(js|jsx)$/,
                use:     ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:  ["style-loader", "css-loader?modules"],
            },
            {
              test:    /\.scss$/,
              loaders: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                      {
                          loader: 'css-loader',
                      },
                    'sass-loader'
                  ]
              })
            },
            {
                test:    /\.(jpe?g|png|gif|svg|ttf|woff|eot)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
                ]
            }
        ],
    },

    plugins:     [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: 'bundle.css' }),
        new StyleLintPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html'
        }),
        // new webpack.DefinePlugin({
        //   'process.env': {
        //     NODE_ENV: JSON.stringify('production')
        //   }
        // }),

    ]
};
