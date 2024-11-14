# vite-react-ts-eslint-prettier-husky

This manual shows how to setup Eslint, Prettier and Husky for any project.
For example we will use vite-react-ts template.

ESLint example
![eslint](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/eslint.png 'eslint')

Husky example
![husky](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/husky.png 'husky')

Conventional Commits example
![conventional_commits](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/conventional_commits.png 'conventional_commits')

# 0 Theory

## 0.1 Problem

- Working in a team might be challenging if every member has own preference how to write the code and which rules to follow.
- You might want to follow coding standards and best practices.
- You might want to have an automated tool to check your accessibility while development, remove or at least highlight unused variables etc.

## 0.2 Solution

Linter - a program that **checks** a codebase based on the defined set of rules.

Formatter - a program that **formats** a codebase based on the defined set of rules.

## 0.3 ESLint

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

## 0.4 Prettier

An opinionated code formatter.

## 0.5 Husky

A program which executes scripts on git actions.

## 1 Setup

```bash
yarn create vite app -- --template react-ts
```

```bash
cd app
```

```bash
yarn install
```

## 2 Install ESLint and Prettier packages

### 2.1 List of packages

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- eslint-plugin-import
- eslint-import-resolver-typescript
- eslint-config-prettier
- eslint-plugin-prettier
- prettier

```bash
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-jsx-a11y eslint-config-prettier eslint-plugin-prettier prettier
```

### 2.2 package.json

```json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.14.0",
    "@typescript-eslint/parser": "^8.14.0",
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.14.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-import-resolver-typescript": "^3.6.3",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "prettier": "^3.3.3",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.11.0",
    "vite": "^5.4.10"
  }
}
```

### 2.3 eslint.config.js

```js
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    // specify the formats on which to apply the rules below
    files: ['**/*.{ts,tsx}'],
    // use predefined configs in installed eslint plugins
    extends: [
      // js
      js.configs.recommended,
      // ts
      ...tseslint.configs.recommended,
      // react
      react.configs.flat.recommended,
      // import
      importPlugin.flatConfigs.recommended,
      // a11y (accessibility
      jsxA11y.flatConfigs.recommended,
      // prettier
      prettier
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    // specify used plugins
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      // for eslint-plugin-react to auto detect react version
      react: {
        version: 'detect'
      },
      // for eslint-plugin-import to use import alias
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      // set of custom rules
      'no-console': 'warn',
      'react/button-has-type': 'error',
      'react/react-in-jsx-scope': ['off'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
)
```

### 2.4 extends vs plugins

When you use **extends** the predefined config is loaded and you can **add/change** the rules in **rules**.
When you use **plugins** the predefined config is NOT loaded, and you need to **define** all of the rules for this plugin. Usually you use plugins if the plugin doesn't have the defined config.

### 2.5 eslint-config-airbnb

Eslint v9 uses **flat config** (new method of writing eslint config found to add more flexibility when configuring eslint), as for now eslint-config-airbnb can't be used with eslint v9. There are some workarounds but we will not use them.

### 2.6 .prettierrc

```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "semi": false,
  "arrowParens": "always"
}
```

## 3 Testing eslint work

### 3.1 settings.json

```json
"editor.formatOnSave": true,
```

### 3.2 Reload VSCode

src/App.tsx

```tsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
// Unable to resolve path to module '/vite.svg'.eslintimport/no-unresolved
import viteLogo from '/public/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // 'test' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
  const test = 123
  console.log('aaa')

  const f = [1, 2, 3, 4, 5].filter((n) => n % 2 === 0)

  return (
    <>
      <div>
        {/* Using target="_blank" without rel="noreferrer" (which implies rel="noopener") is a security risk in older browsers: see https://mathiasbynens.github.io/rel-noopener/#recommendationseslintreact/jsx-no-target-blank */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.eslintjsx-a11y/alt-text */}
      <img src="" />
      <h1>
        {/* * img elements must have an alt prop, either with meaningful text, or an empty string for decorative 
Missing an explicit type attribute for buttoneslintreact/button-has-type */}
        <button>test</button>
      </h1>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
```

![eslint](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/eslint.png 'eslint')

### 3.3 Adding ESLint to existing codebase

If you add ESLint to a codebase where ESLint wasn't used before you might get many errors. What you can do is

```bash
# fix all files
yarn lint --fix
```

```bash
# fix individual files
yarn eslint --fix /src/Comp.tsx
```

## 4 ESLint Prettier Jest TestingLibrary Vitest

### 4.1 Install packages

```bash
yarn add -D eslint-plugin-jest eslint-plugin-testing-library eslint-plugin-vitest
```

### 4.2 package.json

```json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.14.0",
    "@typescript-eslint/parser": "^8.14.0",
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.14.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-import-resolver-typescript": "^3.6.3",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jest": "^28.9.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "eslint-plugin-testing-library": "^6.4.0",
    "eslint-plugin-vitest": "^0.5.4",
    "globals": "^15.11.0",
    "prettier": "^3.3.3",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.11.0",
    "vite": "^5.4.10"
  }
}
```

### 4.3 eslint.config.js

```js
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'
import testingLibrary from 'eslint-plugin-testing-library'
import vitest from 'eslint-plugin-vitest'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      importPlugin.flatConfigs.recommended,
      jsxA11y.flatConfigs.recommended,
      prettier
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'no-console': 'warn',
      'react/button-has-type': 'error',
      'react/react-in-jsx-scope': ['off'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    plugins: { jest, 'testing-library': testingLibrary, vitest },
    languageOptions: {
      globals: jest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }]
    }
  }
)
```

## 5 Husky pre-commit hook

**Husky**
Ultra-fast modern native git hooks

**lint-staged**
Run linters against staged git files and don't let 💩 slip into your code base!

### 5.1 Install packages

```bash
yarn add -D husky lint-staged
```

```bash
npx husky init
```

### 5.2 app/.husky/pre-commit

npx lint-staged

### 5.3 app/lint-staged.config.js

```js
export default {
  '**/*.{ts,tsx}': (stagedFiles) => [`eslint .`, `prettier --write ${stagedFiles.join(' ')}`]
}
```

![husky](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/husky.png 'husky')

## 6 Conventional commits

[link](https://www.conventionalcommits.org/en/v1.0.0/)

### 6.1 Install packages

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```

### 6.2 app/.husky/commit-msg

npx --no-install commitlint --edit "$1"

### 6.3 app/commitlint.config.js

```js
export default { extends: ['@commitlint/config-conventional'] }
```

![conventional_commits](https://raw.githubusercontent.com/Leon740/vite-react-ts-eslint-boilerplate/main/public/conventional_commits.png 'conventional_commits')

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
})
```
