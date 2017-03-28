module.exports = {
    "extends": "google",
    "rules": {
      "comma-dangle": ["error", "never"],
      "require-jsdoc": ["error", {
        "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": false
        }
      }],
      "indent": ["error", 2]
    },
    "ecmaFeatures": {
      "modules": true,
      "spread" : true,
      "restParams" : true
    },
    "env" : {
      "browser" : false,
      "node" : true,
      "es6" : true
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
