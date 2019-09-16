const express = require('express');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.send({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }
}
exports.default = new App().express;
