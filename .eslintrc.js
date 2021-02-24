module.exports = {
  'extends': [
    'airbnb',
  ],
  "env": {
    "browser": true,
    "node": true,
  },
  root: true,
  plugins: [
    'import',
    'react',
  ],
  settings: {
    react: {
      version: '16.9'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    'no-console': 'error',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 2,
    'import/no-named-as-default': 0,
    'no-return-await': 2,
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'semi': 2,
    'no-underscore-dangle': 1,
    "no-use-before-define": 0,
    'jsx-a11y/anchor-is-valid':1,
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn"
  }
}
