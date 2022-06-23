const fsPromises = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");
const data = {
    users: require("../model/user.json"),
    setUsers: async function(account) {
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "user.json"),
            JSON.stringify(account),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        this.account = account;
    },
};


const logout = async (req, res) => {
    const refreshToken = req.cookies?.jwt;

    if(!refreshToken) return res.sendStatus(403);

    const findUser = data.users.find(user => user.refreshToken === refreshToken)
    if (!findUser) {
        return res.sendStatus(403);
    }
    try {
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(decoded.userName != findUser.account) throw new Error();

        const logoutUser = {...findUser,refreshToken: null};
        const otherUsers = data.users.filter(user => user.account == decoded.username);
        data.setUsers([...otherUsers,logoutUser]);
        res.clearCookie("jwt",{httpOnly: true, sameSite: 'None', secure: true});
        res.status(201).json(['登出成功!'])
    } catch(err) {
        console.log(err)
        return res.sendStatus(403)
    }
};

module.exports = {
    logout
};