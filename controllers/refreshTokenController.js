const User = require('../model/User');
const jwt = require('jsonwebtoken');


const getAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    res.sendStatus(403);
    return;
  }
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.sendStatus(403);
    return;
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.username !== foundUser.username) throw new Error();
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
