const jwt = require("jsonwebtoken");

const authVerify = (req,res,next) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if(!accessToken) {
       return res.sendStatus(403);
    } else {
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(error,encoded)=>{
            if(error) {
                console.log("沒通過jwt")
                return res.sendStatus(403);
            } 
            req.userName = encoded.username;
            req.role = encoded.role;
            next();
        })
    }
}

module.exports = { authVerify };