const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const {errorHandler,accessHandler} = require('./middleware/logHandler')
const PORT = process.env.PORT || 3500;

const whiteList =  [''];
const corsOptions = {
    origin: (origin,callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error("CORS"))
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(accessHandler);
app.use(cors(corsOptions)) //cors放在最前面
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('^/$|^\/index(.html)?$', function(req, res) {
    logEmitter.emit('log');
    res.sendFile(path.join(__dirname,'views','index.html'))
});

app.get('/sub/|/sub/index(.html)?$', (req, res) => {
    res.sendFile(path.join(__dirname,'views/sub','index.html'))
});
app.get('/newPage(.html)?$',(req, res) => {
    res.sendFile(path.join(__dirname,'views','newPage.html'))
});
app.get('/oldPage(.html)?$',(req, res) => {
  res.redirect(301,'/newPage.html')
});
app.get('/500(.html)?$',(req, res) => {
  res.status(500).sendFile(path.join(__dirname,'views','500.html'))
});
//router handler
app.get('/welcome', (req, res, next) => {
    console.log('welcome everybody');
    next();
}, (req, res) => {
    res.redirect('/')
})
//這個要放最後不然會蓋住其他的
app.all('*',(req,res)=>{
    res.format({
        'application/json': () => {
            res.status(404).send(["404 not found"])
        },
        'dafault': () => {
            res.status(404).sendFile(path.join(__dirname,'views','404.html'))
        }
    })
})

app.use(errorHandler);

app.listen(PORT)
