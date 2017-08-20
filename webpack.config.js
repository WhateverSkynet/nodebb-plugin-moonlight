const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    moonlight: [
      "./src/client/main.scss"
    ],
    admin: [
      "./src/client/admin.scss"
    ],
    main: [
      "./src/client/index.tsx"
    ]
  },
  output: {
    path: __dirname + "/dist",
    libraryTarget: "amd",
    filename: '[name].js?',
    sourceMapFilename: '[name].map?',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules')
    ],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMaps: true,
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMaps: true,
              }
            }
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
            }
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: "source-map-loader",
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
};
