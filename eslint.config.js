import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Apply ESLint to JavaScript and TypeScript files
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // Set up global variables for Node.js
  { languageOptions: { globals: globals.node } },

  // Use recommended ESLint JavaScript rules
  pluginJs.configs.recommended,

  {
    rules: {
      // Warnings for unused variables, but still want to see them
      'no-unused-vars': 'warn',

      // Enforce stricter rules for best practices
      'no-console': ['off', { allow: ['warn', 'error'] }], // Disallow console.log in production but allow warnings and errors
      'no-debugger': 'error', // Disallow debugger statements in production

      // Ensure proper formatting and styling
      'no-magic-numbers': ['warn', { ignore: [0, 1] }], // Warn about magic numbers, except for 0 and 1
      'consistent-return': 'error', // Enforce consistent return statements
      'array-callback-return': 'error', // Enforce return in array methods like map, filter, etc.

      // Prevent the use of unsafe operations
      'no-eval': 'error', // Disallow the use of eval() for security reasons
      'no-new-func': 'error', // Disallow the use of Function constructor

      // Prevent implicit `any` type in TypeScript
      '@typescript-eslint/no-explicit-any': 'error', // Disallow the use of `any` type
      '@typescript-eslint/explicit-module-boundary-types': 'error', // Require function return types to be explicitly defined
      '@typescript-eslint/no-unsafe-assignment': 'error', // Disallow assignments that can cause unsafe operations
      '@typescript-eslint/no-unsafe-member-access': 'error', // Disallow accessing members of an object with an unsafe type
      '@typescript-eslint/no-unsafe-call': 'error', // Disallow unsafe method calls

      // Enforce stricter TypeScript linting rules
      '@typescript-eslint/explicit-function-return-type': 'off', // Enforce function return types to be explicit
      '@typescript-eslint/no-inferrable-types': 'warn', // Warn about type inference when explicit typing can be used
    },
  },

  // TypeScript recommended configurations
  ...tseslint.configs.recommended,

  // TypeScript strict mode for enhanced type checking
  ...tseslint.configs.strict,

  // TypeScript stylistic rules for consistent code style
  ...tseslint.configs.stylistic,

  // Enable strict checking for TypeScript
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Make sure it references the correct `tsconfig.json`
      },
    },
  },
];
