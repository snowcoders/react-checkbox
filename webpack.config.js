// import * as webpack from "webpack";
let webpack = require("webpack");
const path = require("path");

const config /*: webpack.Configuration*/ = {
  entry: {
    main: "./src/component.tsx"
  },
  output: {
    chunkFilename: "component.js",
    filename: "component.js",
    library: "@snowcoders/react-checkbox",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  // Here is a list of our peer-dependencies that we will not include but need to have access to
  // Specifically because we use umd, we have to specify more information
  // https://stackoverflow.com/questions/34252424/webpack-umd-lib-and-external-files
  externals: {
    "@snowcoders/react-unstyled-button": "@snowcoders/react-unstyled-button",
    classnames: "classnames",
    react: {
      amd: "react",
      commonjs: "react",
      commonjs2: "react",
      root: "React"
    },
    tslib: "tslib"
  }
};

// export default config;
module.exports = config;
