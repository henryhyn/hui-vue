module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: ['standard', 'eslint:recommended'],
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'html'
  ],
  rules: {
    camelcase: 2,
    eqeqeq: 2,
    curly: 2,
    indent: [2, 2],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'space-infix-ops': 2,
    'comma-dangle': 1,
    'no-undef': 1,
    'global-strict': 0,
    'no-extra-semi': 1,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'no-trailing-spaces': [1, {'skipBlankLines': true}],
    'no-unreachable': 1,
    'no-alert': 0,
    'brace-style': [2, '1tbs'],
    'block-scoped-var': 2,
    'generator-star-spacing': 0,
    'no-extra-parens': 2,
    'no-cond-assign': [2, 'always'],
    'linebreak-style': [2, 'unix'],
    'eol-last': 2,
    'padded-blocks': [2, 'never'],
    'object-curly-spacing': [2, 'always', { objectsInObjects: false }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
