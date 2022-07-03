const User = require('../model/User');
const jwt = require('jsonwebtoken');

const logout = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    res.sendStatus(403);
    return;
  }
  const foundUser = await User.findOne({refreshToken});
  if (!foundUser) {
    res.sendStatus(403);
    return;
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.userName !== foundUser.username) throw new Error();

    foundUser.refreshToken = null;
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(201).json(['登出成功!']);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

module.exports = {
  logout,
};
