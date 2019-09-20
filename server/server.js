const express     = require('express');
const bodyParser  = require('body-parser');
require('dotenv').config();

class App {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandlerMdw();
  }

  middleware() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    const dbCon = require('./setup/db');
    this.express.locals = { ...this.express.locals, db: dbCon() };
    this.express.locals.db.sequelize.sync();
    require('./initRoutes')(this.express);
  }

  errorHandlerMdw() {
    this.express.use((err, req, res, next) => {
      const { start, httpStatus, message, previousError, stack } = err;

      res.status(httpStatus || 406).json({
        status: false,
        code: httpStatus || 406,
        message,
        data: previousError
      });
    });
  }

  async routes() {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.send({
        message: 'Helo Dunia'
      });
    });
    this.express.use('/', router);
  }
}

exports.default = new App().express;
