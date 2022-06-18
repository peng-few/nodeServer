const logEvent = require("./logEvent")

exports.accessLog =  (req,res,next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`,'log');
    next();
}

exports.errorHandler = (err,req,res,next) =>{
    logEvent(`${err.stack}\t${req.url}\t${req.headers.origin}\t\n\n`,'err');
    res.redirect('/500.html')
    
}