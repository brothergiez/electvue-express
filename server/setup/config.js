require('dotenv').config();
const path = require('path');

const databaseConfig = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  params: {
    dialect: process.env.DATABASE_ENGINE,
    dialectModulePath: '@journeyapps/sqlcipher',
    storage: path.join(__dirname, process.env.DATABASE_STORAGE),
    define: {
      underscore: process.env.DATABASE_FUNCTION_DEFINE
    },
    operatorAliases: process.env.OPERATOR_ALIASES
  }
}

module.exports = databaseConfig;