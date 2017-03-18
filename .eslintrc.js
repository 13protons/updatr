module.exports = {
    "extends": "google",
    "parserOptions": {
      "ecmaVersion": 6
    },
    "rules": {
      "comma-dangle": ["error", "never"],
      "require-jsdoc": ["error", {
        "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": false
        }
      }]
    }
};
