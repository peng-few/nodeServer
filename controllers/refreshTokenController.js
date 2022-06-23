const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();


const data = {
    users: require("../model/user.json"),
};

const refreshToken = (req, res) => {
    const refreshToken = req.cookies?.jwt;

    if(!refreshToken) return res.sendStatus(403);

    const findUser = data.users.find(user => user.refreshToken === refreshToken)
    if (!findUser) {
        return res.sendStatus(403);
    }
    try {
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(decoded.userName != findUser.account) throw new Error();
        const accessToken = jwt.sign(
            { userName: decoded.userName },
            process.env.ACCESS_TOKEN_SECRET,
            {'expiresIn': '30s'}
        )
        res.status(201).json([accessToken]);
    } catch(err) {
        console.log(err)
        return res.sendStatus(403)
    }
};


module.exports = {
    refreshToken,
};