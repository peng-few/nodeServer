const User = require('../model/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const createNewAccount = async (req, res) => {
  const newAccount = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!newAccount.username || !newAccount.password) {
    res.status(400).json({ error: '請填寫完整' });
    return;
  }

  const isDuplicated = await User.findOne({ username: newAccount.username }).exec();

  if (isDuplicated) {
    res.status(400).json({ error: '帳號或密碼部正確' });
    return;
  }

  try {
    newAccount.password = await bcrypt.hash(newAccount.password, saltRounds);
  
    const result = await User.create(newAccount);
    console.log(result)
  
    res.status(201).json({ success: '註冊成功!' });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  createNewAccount,
};
