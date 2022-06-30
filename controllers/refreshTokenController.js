const jwt = require('jsonwebtoken');
const DB = require('../model/user.json');

const data = {
  users: DB,
};

const getAccessToken = (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    res.sendStatus(403);
    return;
  }

  const findUser = data.users.find((user) => user.refreshToken === refreshToken);
  if (!findUser) {
    res.sendStatus(403);
    return;
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.userName !== findUser.account) throw new Error();
    const accessToken = jwt.sign(
      { userName: decoded.userName,role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' },
    );
    res.status(201).json([accessToken]);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

module.exports = {
  getAccessToken,
};
