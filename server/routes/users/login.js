const express = require('express');
const router = express.Router();

const { createHandler } = require('../../utils');
const { login: handler } = require('../../controllers/users');

router.post('/login', createHandler(handler));

module.exports = router;
