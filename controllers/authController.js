const User = require('../model/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json(['請填寫完整']);
    return;
  }

  const foundUser = await User.findOne({username}).exec();

  if (!foundUser) {
    res.sendStatus(401);
    return;
  }

  const correctPwd = await bcrypt.compare(password, foundUser.password);
  if(!correctPwd)  {
    res.sendStatus(401);
    return;
  }

  const accessToken = jwt.sign(
    { username, role: foundUser.role},
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '120s' },
  );

  const refreshToken = jwt.sign(
    { username, role: foundUser.role},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' },
  );

  try {
    foundUser.refreshToken = refreshToken;
    await foundUser.save()
  } catch (error) {
    console.log(error);
  }

  res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.status(201).json([accessToken]);
};

module.exports = {
  login,
};
