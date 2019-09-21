const express = require('express');
const router = express.Router();

const { createHandler } = require('../../utils');
const { getUsers: handler } = require('../../controllers/users');

router.get('/users', createHandler(handler));

module.exports = router;
