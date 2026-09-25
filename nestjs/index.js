const js = require('@eslint/js');
const [ignores, tsConfig] = require('../common');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ignores,

  {
    ...tsConfig,
    rules: {
      ...js.configs.recommended.rules,
      ...tsConfig.rules,
    },
  },
];