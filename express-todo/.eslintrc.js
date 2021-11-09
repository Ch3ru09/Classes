module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'warning',
      2
    ],
    'linebreak-style': [
      'warning',
      'unix'
    ],
    'quotes': [
      'warning',
      'single'
    ],
    'semi': [
      'warning',
      'always'
    ],
    'no-unused-vars': ["warning", { "argsIgnorePattern": "^_" }]
  }
};
