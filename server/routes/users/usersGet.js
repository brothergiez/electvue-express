const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  try {
    users = await Users.findAll({});
    res.send(users);
  } catch (err) {
    res.status(412).send({ error: err.message });
  }
});

module.exports = router;
