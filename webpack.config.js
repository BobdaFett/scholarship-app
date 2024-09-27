const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    customElements: {
      import: [
        "./src/customElements/ActionButton.ts",
        "./src/customElements/Forms.ts",
        "./src/customElements/OutlinedTextField.ts",
        "./src/customElements/Ripple.ts",
        "./src/customElements/Tabs.ts",
        "./src/customElements/MultipleEntry.ts",
        "./src/customElements/modalWindow.ts",
        "./src/customElements/Checkbox.ts"
      ],
    },
    scripts: {
      import: "./src/scripts/scripts.js",
      library: {
        name: "Lib",
        type: "var",
      },
    },
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: false,
          },
        },
      }),
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/bundles"),
  },
};
