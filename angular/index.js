const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const [ignores, tsConfig] = require('../common');

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
  ignores,

  // ── TypeScript ──────────────────────────────────────────────────────────────
  {
    ...tsConfig,
    plugins: {
      '@angular-eslint': angularPlugin,
      ...tsConfig.plugins,
    },
    rules: {
      ...recommendedRules(angularPlugin, '@angular-eslint'),
      ...tsConfig.rules,

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