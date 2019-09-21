const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const postUser = async (req, res) => {
  const Users = req.app.locals.db.models.Users;
  const { username, password, fullname, isAdmin } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  try {
    let user = await Users.create({
      username,
      password: hashed,
      fullname,
      isAdmin
    });

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_PRIVATE_KEY
    );

    user = _.pick(user, ['fullname', 'username', 'createdAt']);

    res.send({ ...user, token });
  } catch (err) {
    res.status(412).send({ error: err.message });
  }
};

module.exports = postUser;
