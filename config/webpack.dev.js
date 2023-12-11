const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "iceCream",
      filename: "remoteEntry.js",
      exposes: {
        "./iceCreamApp": "./src/bootstrap.js",
      },
      remotes: {
        container: "container@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
