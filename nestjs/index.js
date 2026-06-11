const stylistic = require('@stylistic/eslint-plugin');
const tsEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const js = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['projects/**/*'],
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      '@stylistic': stylistic,
      'import': importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsEslint.configs['recommended'].rules,

      // TypeScript
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
          overrides: {
            parameterProperties: 'off',
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'signature',
              'call-signature',
              'static-initialization',

              'public-static-field',
              'protected-static-field',
              'private-static-field',
              '#private-static-field',

              'public-static-set',
              'protected-static-set',
              'private-static-set',
              '#private-static-set',

              'public-static-method',
              'protected-static-method',
              'private-static-method',
              '#private-static-method',

              'public-decorated-field',
              'protected-decorated-field',
              'private-decorated-field',

              'public-instance-field',
              'protected-instance-field',
              'private-instance-field',
              '#private-instance-field',

              'public-abstract-field',
              'protected-abstract-field',

              'public-field',
              'protected-field',
              'private-field',
              '#private-field',

              'public-decorated-set',
              'protected-decorated-set',
              'private-decorated-set',

              'public-instance-set',
              'protected-instance-set',
              'private-instance-set',
              '#private-instance-set',

              'public-abstract-set',
              'protected-abstract-set',

              'public-set',
              'protected-set',
              'private-set',
              '#private-set',

              'public-constructor',
              'protected-constructor',
              'private-constructor',

              'public-decorated-method',
              'protected-decorated-method',
              'private-decorated-method',

              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
              '#private-instance-method',

              'public-abstract-method',
              'protected-abstract-method',
            ],
          },
        },
      ],

      // Stylistic
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
      '@stylistic/indent': [
        'error',
        2,
        {
          ignoredNodes: [
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
        },
      ],

      // Отключаем базовые в пользу @stylistic
      'indent': 'off',
      'quotes': 'off',
      'no-useless-constructor': 'off',

      // Core
      'curly': 'error',
      'space-before-blocks': 'error',
      'lines-between-class-members': ['error', 'always'],
      'object-curly-spacing': ['error', 'never'],
      'semi': ['error', 'always'],
      'keyword-spacing': 'error',
      'no-trailing-spaces': 'error',
      'grouped-accessor-pairs': ['error', 'setBeforeGet'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      'eol-last': ['error', 'always'],
      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: true,
        },
      ],

      // Import
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
