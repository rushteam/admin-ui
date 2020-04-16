const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require('webpack');
const apiMocker = require("mocker-api");
//html-minifier-terser
module.exports = {
  mode: 'development',
  entry: {
    app: "./src/index.tsx",
    // "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    // "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    // "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    // "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    // "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker"
  },
  module: {
    rules: [
      {
        test: /froala-editor/,
        parser: {
          amd: false,
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: { injectType: "singletonStyleTag" }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 'postcss-loader',
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2?|eot|ttf|otf)\??.*$/,
        use: ["url-loader"]
        // use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: "source-map",//inline-source-map
  devServer: {
    contentBase: "./dist",
    historyApiFallback: {
      rewrites: [{ from: /^\/(login|admin.*)$/, to: "/index.html" }]
    },
    before(app) {
           apiMocker(app, path.resolve("./mock/index.js"));
    },
    proxy: {
      // '/api': 'http://localhost:3000'
    }
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 32 // 优先级
        },
        common: {
          name: "common",
          test: /[\\/]src[\\/]components/,
          minSize: 1024,
          chunks: "all",
          priority: 16
        }
      }
    },
    usedExports: true,
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, //忽略autoprefixer
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],
  },
  resolve:{
    extensions: [".tsx", ".ts", ".js"],
    alias:{
      '@': path.resolve(__dirname, './src')
    },
  },
  // externals: {
  //   'react': "React",
  //   'react-dom': "ReactDOM",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: "AdminUI",
      template: "./src/index.html",
      chunks: ['app']
    }),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash:6].css',
      ignoreOrder: true
    }),
    // new MonacoWebpackPlugin({
    //   languages: ["typescript","javascript", "css", "html", "json"],
    //   features: ["coreCommands", "find"]
    // })
  ],
  output: {
    publicPath: '/',
    filename: "js/[name]-[chunkhash:6].js",
    path: path.resolve(__dirname, "dist"),
  }
};
