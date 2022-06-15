const logEvent = require("./logEvent")

exports.accessHandler =  (req,res,next) => {
    logEvent(`${req.url}\t`,'log');
    next();
}

exports.errorHandler = (err,req,res,next) =>{
    console.log(err);
    logEvent(`${err.stack}\t${req.url}\t${req.origin}\t`,'err');
    res.status(500).sendFile(path.join(__dirname,'views','500.html'))
}