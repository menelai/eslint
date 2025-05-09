module.exports = {
  'root': true,
  'ignorePatterns': [
    'projects/**/*'
  ],
  'overrides': [
    {
      'files': [
        '*.ts'
      ],
      'parserOptions': {
        'project': [
          'tsconfig.json'
        ],
        'createDefaultProgram': true
      },
      'plugins': [
        '@stylistic/eslint-plugin',
        'import'
      ],
      'extends': [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      'rules': {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', {'accessibility': 'no-public'}],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@stylistic/indent': ['error', 2],
        '@stylistic/quotes': [
          'error',
          'single',
          {
            'allowTemplateLiterals': true
          }
        ],
        'curly': 'error',
        'indent': 'off',
        'no-useless-constructor': 'off',
        'quotes': 'off',
        'space-before-blocks': 'error',
        'lines-between-class-members': ['error', 'always'],
        'object-curly-spacing': ['error', 'never'],
        'semi': ['error', 'always'],
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            'default': {
              'memberTypes':[
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
                'protected-abstract-method'
              ]
            }
          }
        ],
        'grouped-accessor-pairs': ['error', 'setBeforeGet'],
        'comma-spacing': [
          'error',
          {
            'before': false,
            'after': true
          }
        ],
        'comma-dangle': ['error', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'always-multiline'
        }],
        'eol-last': ['error', 'always'],
        'no-irregular-whitespace': [
          'error',
          {
            'skipStrings': true,
            'skipComments': true,
            'skipRegExps': true,
            'skipTemplates': true
          }
        ],
        '@angular-eslint/no-input-rename': 'off',
        '@angular-eslint/component-selector': [
          'error',
          {
            'prefix': 'app',
            'style': 'kebab-case',
            'type': 'element'
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            'prefix': 'app',
            'style': 'camelCase',
            'type': 'attribute'
          }
        ],
        'import/no-unresolved': 'off',
        'import/order': [
          'error',
          {
            'alphabetize': {
              'order': 'asc',
              'caseInsensitive': false
            },
            'groups': [
              'external',
              'builtin',
              'internal',
              'parent',
              'sibling',
              'index'
            ],
            'newlines-between': 'always'
          }
        ]
      }
    },
    {
      'files': [
        '*.html'
      ],
      'extends': [
        'plugin:@angular-eslint/template/recommended'
      ],
      'rules': {
        "@angular-eslint/template/eqeqeq": [
          "error",
          {
            "allowNullOrUndefined": true
          }
        ],
      }
    }
  ]
}
