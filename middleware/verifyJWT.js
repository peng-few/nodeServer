const jwt = require("jsonwebtoken");
require('dotenv').config();


const authVerify = (req,res,next) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if(!accessToken) {
       return res.sendStatus(403);
    } else {
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(error,encoded)=>{
            if(error)  return res.sendStatus(403);
            req.userName = encoded.userName;
            req.role = encoded.role;
            next();
        })
    }
}

module.exports = { authVerify };