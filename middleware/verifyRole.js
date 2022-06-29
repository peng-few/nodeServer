const verifyRole = (allowRoles) => {
    return (req,res,next) => {
       const userRole = req.role;
       if(allowRoles.includes(userRole)) next();
       res.sendStatus(403)
    }
}

module.exports = verifyRole;