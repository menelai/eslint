# @kovalenko/eslint

Shared ESLint flat config для TypeScript-проектов на Angular и NestJS.

## Требования

- Node.js >= 18
- ESLint >= 9

## Установка

```bash
npm install -D @kovalenko/eslint \
  eslint \
  @eslint/js \
  @stylistic/eslint-plugin \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-import \
  eslint-import-resolver-typescript
```

Для Angular дополнительно:

```bash
npm install -D \
  @angular-eslint/eslint-plugin \
  @angular-eslint/eslint-plugin-template \
  @angular-eslint/template-parser
```

## Использование

### Angular

`eslint.config.js`:

```js
const angularConfig = require('@kovalenko/eslint/angular');

module.exports = [
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
| Стиль | `@stylistic` — отступы 2 пробела, одинарные кавычки |
| Импорты | `eslint-plugin-import` — сортировка групп, newlines между группами |
| Core | `curly`, `semi`, `eol-last`, `comma-dangle`, `no-trailing-spaces` и др. |

### Angular

| Категория | Плагин |
|---|---|
| TS-компоненты | `@angular-eslint` recommended — селекторы, декораторы |
| HTML-шаблоны | `@angular-eslint/template` — `eqeqeq`, `no-negated-async`, `banana-in-box` |
| Inline-шаблоны | `extract-inline-html` processor |

### NestJS

Дополнительно в `@stylistic/indent` настроены `ignoredNodes` для корректной обработки декораторов NestJS:

```
FunctionExpression > .params[decorators.length > 0]
FunctionExpression > .params > :matches(Decorator, :not(:first-child))
ClassBody.body > PropertyDefinition[decorators.length > 0] > .key
```

## Порядок членов класса

Оба конфига применяют единый `@typescript-eslint/member-ordering`:

```
статические поля → статические методы → поля экземпляра → конструктор → методы экземпляра
```

Внутри каждой группы порядок: `public` → `protected` → `private` → `#private`.

## Лицензия

MIT
