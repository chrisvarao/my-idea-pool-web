module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  plugins: ['eslint-plugin-import-order-alphabetical', 'html', 'import', 'promise'],
  rules: {
    'class-methods-use-this': 0,
    'guard-for-in': 0,
    // Allow const x => y => x * y;
    'implicit-arrow-linebreak': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['stubs/**/**', 'tests/**/**', 'karma.conf.js', 'webpack.config.js'] },
    ],
    'import/prefer-default-export': 0,
    'import-order-alphabetical/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'max-len': ['error', { code: 120 }],
    'no-continue': 0,
    // Improve literacy of reduce() functions
    'no-param-reassign': 0,
    'no-restricted-syntax': ['error', 'WithStatement'],
    // Prefix symbols with underscore to denote private visibility
    'no-underscore-dangle': 0,
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    // Required for including regex in string attribute values
    'no-useless-escape': 0,
    'no-else-return': [2, { allowElseIf: true }],
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'error',
    'react/jsx-one-expression-per-line': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
  },
};
