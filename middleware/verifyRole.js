const verifyRole = (allowRoles) => {
    return (req,res,next) => {
       const userRole = Object.keys(req.role)[0];
       if(allowRoles.includes(userRole)) {
        next();
       } else {
        console.log("role 沒有通過")
        res.sendStatus(403)
       }
       
    }
}

module.exports = verifyRole;