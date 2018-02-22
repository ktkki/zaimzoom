// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
  },
  extends: [
    // check vue best practice
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // use standard for rules
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard",
    // ignore prettier format rules
    // https://qiita.com/soarflat/items/06377f3b96964964a65d
    // http://tech-1natsu.hatenablog.com/entry/2018/01/07/154941
    "plugin:prettier/recommended",
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // configure for prettier
    // **NOTICE**
    // this configs are MUST equal with .prettierrc in your root
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
      },
    ],
  },
};
