import path from "node:path"
const config = {
  entry: "./test/test-modules.js",
  mode: "development",
  output: {
    path: path.resolve("./dist"),
    filename: "test-bundle.js",
  },
}

export default config
