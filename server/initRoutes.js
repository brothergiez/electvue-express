const express = require('express');
const routes = require('./routes');

module.exports = app => {
  app.use(express.json());
  routes.forEach(el => {
    app.use(el);
  });
};
