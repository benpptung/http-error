// eslint.config.js
import n from "eslint-plugin-n"

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly"
      }
    },
    plugins: {
      n
    },
    rules: {
      "indent": [0, 2, { "SwitchCase": 1 }],
      "indent-legacy": [1, 2, { "SwitchCase": 1 }],
      "linebreak-style": [1, "unix"],
      "quotes": [0],
      "no-unused-vars": [
        1,
        {
          "caughtErrors": "all",
          "varsIgnorePattern": "(colors)",
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "no-return-await": [1],
      "no-undef": "error",
      "no-console": [1],
      "no-process-exit": [0],
      "no-use-before-define": [2, { "functions": false, "classes": false }],
      "getter-return": [1, { "allowImplicit": true }],
      "callback-return": [1, ["callback", "cb", "next", "done"]],
      "no-buffer-constructor": [1],
      "no-unmodified-loop-condition": [2],
      "no-unused-expressions": [
        1,
        {
          "allowShortCircuit": true,
          "allowTernary": true,
          "allowTaggedTemplates": true
        }
      ],
      "no-ex-assign": [2],
      "no-empty": [1],
      "semi": [1, "never"],
      "operator-linebreak": [1, "before"],
      "curly": [1, "multi-or-nest"],
      "brace-style": [1, "stroustrup", { "allowSingleLine": true }],
      "no-multi-spaces": [1, { "ignoreEOLComments": true }],
      "no-multiple-empty-lines": [1, { "max": 6, "maxEOF": 1 }],
      "space-before-function-paren": [
        1,
        { "anonymous": "never", "named": "never", "asyncArrow": "always" }
      ],
      "object-property-newline": [
        1,
        { "allowMultiplePropertiesPerLine": true }
      ],
      "comma-dangle": [1, "never"],
      "semi-spacing": [1, { "before": false, "after": true }],
      "keyword-spacing": [1],
      "handle-callback-err": [1, "^(er|err|error)$"],
      "unicode-bom": [2, "never"],
      "template-tag-spacing": [1, "never"],
      "template-curly-spacing": [1, "never"],
      "no-unneeded-ternary": [1],
      "no-useless-escape": [1],
      // switch 遺漏 break 時，預設視為 bug
      "no-fallthrough": "error",
      // if (foo = bar) 之類的錯誤
      "no-cond-assign": ["error", "always"],
      // typeof x === 'strng' 這種 typo
      "valid-typeof": "error",
      // if (x === x) 這種幾乎永遠是寫錯
      "no-self-compare": "error",
      // Array.prototype.map / filter / reduce 忘了 return
      "array-callback-return": "error",
      // try/catch 裡 catch 只是丟出一樣的錯，毫無意義
      "no-useless-catch": "warn",
      // imports
      "n/no-missing-import": "error",
      "n/no-extraneous-import": "error"
    }
  }
]