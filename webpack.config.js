const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],

  mode: "development",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },

  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    host: require("ip").address(), //your ip address
    port: 3500,
    hot: true
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         mimetype: "image/png"
      //       }
      //     }
      //   ]
      // },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192 // in bytes
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      // { template: "./app/index.html" }

      Object.assign(
        {},
        {
          inject: true,
          template: "./src/index.html"
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    ),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
