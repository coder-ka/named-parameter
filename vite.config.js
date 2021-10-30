const path = require("path");

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "NamedParameter",
    },
  },
};
