const { resolve } = require;

const OFF = 0;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {
        directory: [resolve('./src/tsconfig.json'), resolve('./scripts/tsconfig.json')],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'unicorn', 'promise'],
  rules: {
    'eslint-comments/disable-enable-pair': [ERROR, { allowWholeFile: true }],

    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],

    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: false,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'unicorn/import-style': OFF,
    'unicorn/no-null': OFF,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/no-process-exit': OFF,
    // Prefer `.querySelector()` over `.getElementById()`
    'unicorn/prefer-query-selector': OFF,

    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    // Useless constructor
    '@typescript-eslint/no-useless-constructor': OFF,
    // 是否允许空接口
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-this-alias': OFF,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    // props传递给子组件是否要求一定要接受
    'react/jsx-props-no-spreading': OFF,
    'react/require-default-props': OFF,
    // 是否要求有必要的写成纯函数的组件
    // 'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/prefer-stateless-function': OFF,
    // 是否要求有必要的自闭合标签
    'react/self-closing-comp': OFF,
    // State initialization should be in a constructor
    'react/state-in-constructor': OFF,
    // Must use destructuring state assignment
    'react/destructuring-assignment': OFF,
    // 是否允许组件有未使用的 state
    'react/no-unused-state': OFF,

    'func-names': OFF,
    'lines-between-class-members': OFF,
    'max-classes-per-file': OFF,
    'no-console': OFF,
    'no-empty': OFF,
    'no-param-reassign': OFF,
    'no-plusplus': OFF,
    'no-underscore-dangle': OFF,
    'no-unused-expressions': OFF,
    'no-use-before-define': OFF,
    'no-useless-constructor': OFF,

    'space-before-function-paren': OFF,
    'dot-notation': [2, { allowKeywords: true, allowPattern: '' }],
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': OFF,
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': OFF,
      },
    },
  ],
};
