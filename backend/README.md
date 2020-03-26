# Be The Hero - Backend

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is the back-end developed along [11th OmniStack](https://github.com/Rocketseat/semana-omnistack-faq) from [RocketSeat.](https://rocketseat.com.br/)

## How to run

In this project, I used [yarn](https://yarnpkg.com/) as package manager. Feel free to use npm if you prefer.

```bash
yarn # install dependencies
yarn knex migrate:list # load migrations list
yarn knex migrate:latest # run database migrations
yarn dev # run project in developer mode (using nodemon)
```

If you are using npm:

```bash
npm install # install dependencies
npx knex migrate:list # load migrations list
npx knex migrate:latest # run database migrations
npm dev # run project in developer mode (using nodemon)
```

## Diferences from original project

- Separation of app and server files
- Class syntax in app
- Enviroments variables
- Unique contraint for Ong's name in database
- Adition of HTTP-Status-Code library to make code more expresive
- Adition of Morgan library to log all requests in server
- Eslint, Prettier and EditorConfig
- CommitLint, Commitzen and Husky to automate commits
- WTFPL as license, instead of MIT
