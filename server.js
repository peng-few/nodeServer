const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const { errorHandler,accessLog } = require('./middleware/logHandler')
const {authVerify} = require("./middleware/verifyJWT")
const PORT = process.env.PORT || 3500;


app.use(accessLog);
app.use(cors(corsOptions))

const cookieParser = require("cookie-parser");
app.use(cookieParser())
//serve static file
app.use("/", express.static('public'))
app.use("/sub", express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/root'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/register', require('./routes/api/register'))
app.use('/api/refreshToken', require('./routes/api/refreshToken'))
app.use('/api/logout', require('./routes/api/logout'))
app.use(authVerify);

app.use('/sub', require('./routes/sub'));
app.use('/api/employee', require('./routes/api/employee'))



app.use(errorHandler);
app.all('/500(.html)?$', (req, res) => {
  res.status(500).sendFile(path.join(__dirname, '..', 'views', '500.html'))
});

//這個要放最後不然會蓋住其他的
app.all('*', (req, res) => {
  res.format({
    'application/json': () => {
      res.status(404).send(["404 not found"])
    },
    'dafault': () => {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
    }
  })
})


app.listen(PORT)