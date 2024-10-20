   module.exports = {
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended', // 如果使用 TypeScript
     ],
     parser: '@typescript-eslint/parser', // 如果使用 TypeScript
     parserOptions: {
       ecmaVersion: 12,
       sourceType: 'module',
     },
     plugins: ['@typescript-eslint'], // 如果使用 TypeScript
     rules: {
       // 在这里添加你自己的规则
       semi: ['error', 'always'],
       quotes: ['error', 'single'],
     },
   };
