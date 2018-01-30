module.exports = {
  "extends": ["p5js", "airbnb-base"],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        config: "./build/webpack.dev.js",
      }
    }
  },
  rules: {
    "import/no-commonjs": ["error", "always"],

    "class-methods-use-this": 0,
    "function-paren-newline": 0,
    "func-names": 0,
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-console": 0,
    "prefer-template": "warn",
    "eol-last": 0,
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": 1 }],
    "no-plusplus": 0,
    "no-mixed-operators": ["error", {"allowSamePrecedence": true}]
  }
}
