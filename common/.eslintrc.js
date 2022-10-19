const { join } = require("path")

module.exports = {
  parserOptions: {
    project: join(__dirname, "tsconfig.json"),
  },
  extends: ["./node_modules/@10stars/config/.eslintrc"],
  rules: {
    // if you want to modify rules, do it here
    // please also inform the team of the change
    "@typescript-eslint/no-magic-numbers": 0,
  },
}
