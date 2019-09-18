const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/users', async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  try {
    let users = await Users.findAll({});

    const data = users.map(user => {
      return _.pick(user, ['fullname', 'username', 'createdAt']);
    })
    // users = _.pick(users, ['fullname', 'username', 'createdAt']);

    res.send(data);
  } catch (err) {
    res.status(412).send({ error: err.message });
  }
});

module.exports = router;
