export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    vue: 'eslint-plugin-vue',
  },
  rules: {
    'no-console': ['warn'],
    'no-debugger': ['error'],
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-components': 'warn',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
  },
};