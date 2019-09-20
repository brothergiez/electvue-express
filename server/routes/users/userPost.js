const express = require('express');
const router = express.Router();

const { createHandler } = require('../../utils');
const { postUser: handler } = require('../../controllers/users');

router.post('/users', createHandler(handler));

module.exports = router;
