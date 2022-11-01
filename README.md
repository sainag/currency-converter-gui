# Currency Converter GUI
Currency Converter GUI built with Vue3 

## Features
- User registration and login
- Integration with Currency API https://currencylayer.com/quickstart (Register to get an API key for free account)
- Authenticated routes for accessing Currency Converter API
- Live currency conversion rates from currency API
- Background job for generating historical currency reports for selected currency with the given ranges: (One Year - Monthly, Six Months - Weekly, One Month - Daily)


## Tech
- Vue3.2.41
- Vue Router 4.1.5
- Pinia 2.0.23
- Cypress 10.10.0

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Installation
Install the dependencies and devDependencies and start the server.

```sh
cd currency-converter-gui

Create .env file in the application root folder and add the following
VITE_API_URL=**backend api url**
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
or
npx cypress open
```

It's recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## License

MIT

**Free Software!**
