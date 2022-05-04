module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: "latest",
  },

  rules: {
    semi: "error",
    "space-in-parens": "error",
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-vars": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-use-before-define": "error",
    "no-console": 0,
  },
};
