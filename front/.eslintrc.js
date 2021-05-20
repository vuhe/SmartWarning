const { resolve } = require;

const OFF = 0;
const WARNING = 1;
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
    'import/no-cycle': OFF,
    'import/prefer-default-export': WARNING,
    // 模块导入顺序要求
    'import/order': WARNING,
    // 命名要求
    'unicorn/filename-case': [
      WARNING,
      {
        cases: {
          // 中划线
          kebabCase: false,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: true,
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
    'unicorn/prefer-query-selector': ERROR,
    // Prefer `error` over `err` in Promise-catch-code-block
    'unicorn/catch-error-name': WARNING,
    // There is no difference in JavaScript between, for example, 1, 1.0 and 1., so prefer the former(1) for consistency.
    'unicorn/no-zero-fractions': WARNING,
    // Do not use useless `undefined`
    'unicorn/no-useless-undefined': WARNING,
    // 是否禁止使用嵌套的三元表达式。
    'unicorn/no-nested-ternary': WARNING,

    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    // Useless constructor
    '@typescript-eslint/no-useless-constructor': OFF,
    // 是否允许空接口
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-this-alias': OFF,
    // 是否允许多余的类型注解
    '@typescript-eslint/no-inferrable-types': WARNING,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    // props传递给子组件是否要求一定要接受
    'react/jsx-props-no-spreading': OFF,
    'react/require-default-props': OFF,
    // 是否要求有必要的写成纯函数的组件
    // 'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/prefer-stateless-function': WARNING,
    // 是否要求有必要的自闭合标签
    'react/self-closing-comp': OFF,
    // State initialization should be in a constructor
    'react/state-in-constructor': OFF,
    // Must use destructuring state assignment
    'react/destructuring-assignment': OFF,
    // 是否允许组件有未使用的 state
    'react/no-unused-state': WARNING,
    'react/display-name': WARNING,

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
    'no-script-url': OFF,
    // 在 else 前是否有 return, allowElseIf: true (默认) 允许在 return 之后有 else if 块
    'no-else-return': [WARNING, { allowElseIf: true }],
    'no-restricted-syntax': WARNING,
    // 不允许位操作
    'no-bitwise': WARNING,
    // disallow variable declarations from shadowing variables declared in the outer scope
    'no-shadow': WARNING,

    // 使用以对象字面量作为第一个参数的 Object.assign，优先使用对象扩展， Use an object spread instead of `Object.assign` eg: `{ ...foo }`
    'prefer-object-spread': WARNING,
    'space-before-function-paren': OFF,
    'dot-notation': [2, { allowKeywords: true, allowPattern: '' }],
    'consistent-return': OFF,
    'promise/always-return': WARNING,
    'jsx-a11y/anchor-is-valid': [
      WARNING,
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
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
