module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "globals": {
      "window": false
    },
    "plugins": [ "node" ],
    "rules": {
      "indent": [
        1, 2,
        {
          "SwitchCase": 1
        }
      ],
      "indent-legacy": [
        0, 2,
        {
          "SwitchCase": 1
        }
       ],
      "linebreak-style": [
          1,
          "unix"
      ],
      "quotes": [
          1,
          "single"
      ],
      "semi": [ 0 ],
      "no-unused-vars": [ // consider to remove this, since uglify will do this for us.
        1,
        {
          "varsIgnorePattern": "(colors|React)",
          "argsIgnorePattern": "^_"          }
      ],
      "no-console": [ 1 ],
      "node/no-unpublished-require": [ 0 ],
      "node/no-missing-require": [ 2, {
          "allowModules": ["electron", "tunnel"]
      }],
      "node/no-extraneous-require": [1]
    }
};
