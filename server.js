const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const subRouter = require('./router/sub');
const rootRouter = require('./router/root');
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

app.use('/sub',subRouter);
app.use('/',rootRouter)


app.use(errorHandler);

app.all('/500(.html)?$',(req, res) => {
    res.status(500).sendFile(path.join(__dirname,'..','views','500.html'))
  });
  
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


app.listen(PORT)
