const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const subRouter = require('./router/sub');
const rootRouter = require('./router/root');
const employeeApi = require('./router/api/employee');
const { errorHandler,accessLog } = require('./middleware/logHandler')
const PORT = process.env.PORT || 3500;

app.use(accessLog);
app.use(cors(corsOptions))

//serve static file
app.use("/sub", express.static('public'))
app.use("/", express.static('public'))

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/sub', subRouter);
app.use('/api/employee', employeeApi)
app.use('/', rootRouter)


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