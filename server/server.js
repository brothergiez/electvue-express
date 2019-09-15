const express     = require('express');
const bodyParser  = require('body-parser');


class App {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    const dbCon = require('./setup/db');
    this.express.locals = { ...this.express.locals, db: dbCon() };
    this.express.locals.db.sequelize.sync();
    require('./initRoutes')(this.express);
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