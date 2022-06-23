const fsPomises = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const data = {
    users: require("../model/user.json"),
    setUsers: async function (users) {
        fsPomises.writeFile(
            path.join(__dirname, "..", "model", "user.json"),
            JSON.stringify(users),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        this.users = users;
    },
};

const login = async (req, res) => {
    const { account,password } = req.body;
    if(!account || !password) {
        return res.status(400).json(["請填寫完整"]);
    }

    const user = data.users.find(user => user.account === account)
    if (!user) {
        return res.sendStatus(401);
    }
    const correctPwd = await bcrypt.compare(password,user.password)
    if (correctPwd) {
        const accessToken = jwt.sign(
            { userName: account },
            process.env.ACCESS_TOKEN_SECRET,
            {'expiresIn': '30s'}
        )

        const refreshToken = jwt.sign(
            { userName: account },
            process.env.REFRESH_TOKEN_SECRET,
            {'expiresIn': '1d'}
        )
        
        const otherUser = data.users.filter(person => person.account !== user.account);
        const currentUser = {...user,refreshToken};
        data.setUsers([...otherUser,currentUser]);

        res.cookie("jwt",refreshToken,{ httpOnly: true,maxAge: 24*60*60*1000 })
        res.status(201).json([accessToken]);
    } else {
        return res.sendStatus(401);
    }
};


module.exports = {
    login,
};