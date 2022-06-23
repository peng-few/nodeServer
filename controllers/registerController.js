const fsPromises = require("fs/promises");
const path = require("path");
const bcrypt =  require('bcrypt');
const saltRounds = 10;

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

const createNewAccount = async (req, res) => {
    const newAccount = {
        account: req.body.account,
        password: req.body.password,
    };

    if (!newAccount.account || !newAccount.password) {
        return res.status(400).json({"error": "請填寫完整"});
    }

    isDuplicated= data.users.find(account => account.account == newAccount.account);

    if(isDuplicated) {
        return res.status(400).json({"error": "帳號或密碼部正確"});
    }

    try {
        newAccount.password = await bcrypt.hash( newAccount.password, saltRounds); 
        await data.setUsers([...data.users, newAccount]);
        res.status(201).json({"success": "註冊成功!"});
    } catch (error) {
        console.log(error);
        res.status(500);
    }

};

module.exports = {
    createNewAccount
};