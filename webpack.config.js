const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        style: [
            "./src/client/main.scss"
        ],
        main: [
            "./src/client/index.tsx"
        ]
    },
    output: {
        path: "./dist",
        libraryTarget: "amd",
        filename: '[name].js?',
        sourceMapFilename: '[name].map?'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, 'node_modules')
        ]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts"
            }, {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract(['css?sourceMap','sass?sourceMap'])
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
};
