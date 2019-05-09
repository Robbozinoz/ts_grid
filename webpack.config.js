const globImporter = require("node-sass-glob-importer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));

module.exports = {
  mode: "production",
  entry: {
    main: ["./js/main.js", "./sass/style.scss"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: false,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              importer: globImporter()
            }
          }
        ]
      },
      {
        include: path.resolve(__dirname, "js/utils.js"),
        sideEffects: false
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
    publicPath: "/assets/"
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    usedExports: true
  }
};
