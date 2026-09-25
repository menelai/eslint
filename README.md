# @kovalenko/eslint

Shared ESLint flat config для TypeScript-проектов на Angular и NestJS.

## Требования

- Node.js >= 20.19
- ESLint >= 10

## Установка

```bash
npm install -D @kovalenko/eslint eslint @eslint/js @stylistic/eslint-plugin @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import-x
```

Для Angular дополнительно:

```bash
npm install -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
```

## Использование

Пакет поддерживает и CommonJS, и ES-модули (`exports` в `package.json`).

### Angular, CommonJS

`eslint.config.js`:

```js
const angularConfig = require('@kovalenko/eslint/angular');

module.exports = [
  ...angularConfig,
];
```

### Angular, ES-модули

`eslint.config.mjs` (или `eslint.config.js` при `"type": "module"` в `package.json`):

```js
import angularConfig from '@kovalenko/eslint/angular';

export default [
  ...angularConfig,
];
```

### NestJS

`eslint.config.js`:

```js
const nestConfig = require('@kovalenko/eslint/nestjs');

module.exports = [
  ...nestConfig,
];
```

В ES-модулях: `import nestConfig from '@kovalenko/eslint/nestjs';`

### Расширение конфига

Дополнительные правила добавляются после спреда базового конфига:

```js
const angularConfig = require('@kovalenko/eslint/angular');

module.exports = [
  ...angularConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { prefix: 'my', style: 'kebab-case', type: 'element' },
      ],
    },
  },
];
```

## Что включено

### Общее (Angular + NestJS)

| Категория | Плагин |
|---|---|
| TypeScript | `@typescript-eslint` recommended + explicit types, member ordering |
| Стиль | `@stylistic` — отступы 2 пробела (`ignoredNodes` для декораторов), одинарные кавычки |
| Импорты | `eslint-plugin-import-x` — сортировка групп, newlines между группами |
| Core | `curly`, `semi`, `eol-last`, `comma-dangle`, `no-trailing-spaces` и др. |

### Angular

| Категория | Плагин |
|---|---|
| TS-компоненты | `@angular-eslint` recommended — селекторы, декораторы |
| HTML-шаблоны | `@angular-eslint/template` — `eqeqeq`, `no-negated-async`, `banana-in-box` |
| Inline-шаблоны | `extract-inline-html` processor |

### NestJS

Дополнительно к общим правилам подключается `js.configs.recommended` (`@eslint/js`).

## Порядок членов класса

Оба конфига применяют единый `@typescript-eslint/member-ordering`:

```
статические поля → статические методы → поля экземпляра → конструктор → методы экземпляра
```

Внутри каждой группы порядок: `public` → `protected` → `private` → `#private`.

## Лицензия

MIT
