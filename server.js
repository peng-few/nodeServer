const express = require('express')
const app = express();
const path = require('path');
const logEvent = require('./js/logEvent')
const EventEmitter = require('node:events');
class Emitter extends EventEmitter {}

const PORT = process.env.PORT || 3500;
app.get('^/$|^\/index(.html)?$', function(req, res) {
  res.sendFile(path.join(__dirname,'views','index.html'))
  logEmitter.emit('log');
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
//router handler
app.get('/welcome', (req, res, next) => {
  console.log('welcome everybody');
  next();
}, (req, res) => {
  res.redirect('/')
})
//這個要放最後不然會蓋住其他的
app.get('/*',(req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})


app.listen(PORT)


const logEmitter = new Emitter();
logEmitter.on('log', (url) => {
 logEvent(url)
});