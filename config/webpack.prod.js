// Webpack for production mode only

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("../package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "http://icecream-microfrontend.apps.ocp4.pacosta.com/",
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
        container:
          "container@http://container-microfrontend.apps.ocp4.pacosta.com/remoteEntry.js",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
