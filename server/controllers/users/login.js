const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { ResponseError, InvalidTokenError } = require('../../utils');

const login = async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    const { dataValues } = user;

    const hashed = await dataValues.password;
    if (!dataValues) {
      throw new ResponseError('Password / Username didn\'t match', 'NOT_FOUND', 404);
    } else {
      const validPassword = await bcrypt.compare(password, hashed);
      if (!validPassword) {
        res.status(404).send({ message: "Password / Username didn't match", errorCode: 404 });
      }
      const token = jwt.sign(
        {
          id: dataValues.id,
          isAdmin: dataValues.isAdmin
        },
        process.env.JWT_PRIVATE_KEY
      );
      const result = _.pick(dataValues, ['fullname', 'username', 'createdAt']);
      res.send({ ...result, token });
    }
  } catch (err) {
      throw new ResponseError("Password / Username didn't match", 'NOT_FOUND', 404);
  }
}

module.exports = login;
