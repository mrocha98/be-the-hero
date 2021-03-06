const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(morgan('dev'));
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    this.server.use(errors());
  }
}

module.exports = new App().server;
