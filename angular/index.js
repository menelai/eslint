const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const stylistic = require('@stylistic/eslint-plugin');
const tsEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');

/**
 * Собирает recommended-правила из плагина по флагу meta.docs.recommended.
 * @param {object} plugin
 * @param {string} prefix
 * @returns {Record<string, string>}
 */
function recommendedRules(plugin, prefix) {
  return Object.fromEntries(
    Object.entries(plugin.rules)
      .filter(([, rule]) => rule.meta?.docs?.recommended)
      .map(([name]) => [`${prefix}/${name}`, 'error']),
  );
}

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['projects/**/*'],
  },

  // ── TypeScript ──────────────────────────────────────────────────────────────
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
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': tsEslint,
      '@stylistic': stylistic,
      'import': importPlugin,
    },
    rules: {
      ...tsEslint.configs['recommended'].rules,
      ...recommendedRules(angularPlugin, '@angular-eslint'),

      // TypeScript
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
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
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],

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

      // Angular
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/component-selector': [
        'error',
        { prefix: 'app', style: 'kebab-case', type: 'element' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { prefix: 'app', style: 'camelCase', type: 'attribute' },
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

  // ── Inline templates ────────────────────────────────────────────────────────
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    processor: angularTemplatePlugin.processors['extract-inline-html'],
  },

  // ── HTML templates ──────────────────────────────────────────────────────────
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...recommendedRules(angularTemplatePlugin, '@angular-eslint/template'),
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
    },
  },
];
