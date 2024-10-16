module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    extends: [
        'standard',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react-refresh'],
    rules: {
        'react/prop-types': 'off',
        'react/jsx-no-target-blank': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        semi: ['error', 'always'],
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
                semi: true,
                bracketSpacing: true,
                jsxBracketSameLine: false,
            },
        ],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', ['sibling', 'parent'], 'index'],
                pathGroups: [
                    {
                        pattern: '$app/**',
                        group: 'external',
                    },
                    {
                        pattern: '~/**',
                        group: 'sibling',
                    },
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always',
            },
        ],
    },
    settings: {
        react: { version: '18.2' },
    },
};