require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.post('/users', async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  const {
    username,
    password,
    fullname,
    isAdmin
  } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  try {
    let user = await Users.create({
      username,
      password: hashed,
      fullname,
      isAdmin
    });
    
    user = _.pick(user, [
      'fullname',
      'username',
      'createdAt'
    ]);

    res.send(user);
  } catch (err) {
    res.status(412).send({ error: err.message });
  }
})

module.exports = router;
