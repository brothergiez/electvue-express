const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const databaseConfig = require('./config');


let db;

module.exports = () => {
  const {
    database,
    username,
    password,
    params
  } = databaseConfig;

  if(!db) {
    const sequelize = new Sequelize(
      database,
      username,
      password,
      params
    );

    db = {
      sequelize,
      Sequelize,
      models: {}
    }

    const dir = path.join(__dirname, '../models');
    fs.readdirSync(dir).forEach(mod => {
      const modelDir = path.join(dir, mod);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    })
  } 
  
  return db;
}