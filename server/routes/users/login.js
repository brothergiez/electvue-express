const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.post('/login', async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  const {
    username,
    password
  } = req.body;
  try{
    const user = await Users.findOne({ where: { username } });
    const {
      dataValues
    } = user;

    const hashed = await dataValues.password;
    if (!dataValues) {
      res.status(404).send({ message: 'User not found', errorCode: 404 });
    }else{
      const validPassword = await bcrypt.compare(password, hashed);
      if (!validPassword) {
        res.status(404).send({ message: 'Password / Username didn\'t match', errorCode: 404 });
      }
      res.send(_.pick(dataValues, ['fullname', 'username', 'createdAt']));
    }
  }catch(err){
    res.status(400).send({ message: 'Can\'t connect database', errorCode: 404 });
  }
});

module.exports = router;
