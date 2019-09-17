const express = require('express');
const router = express.Router();

router.post('/users', async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  try {
    const user = await Users.create(req.body);
    res.send(user);
  } catch (err) {
    res.status(412).send({ error: err.message });
  }
  

})

module.exports = router;
