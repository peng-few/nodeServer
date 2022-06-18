const express = require('express')
const router = express.Router();
const path = require('path');

router.use(express.static('public'))
router.get('/|/index(.html)?$', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'))
});

router.get('/newPage(.html)?$', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','newPage.html'))
});

router.get('/oldPage(.html)?$',(req, res) => {
  res.redirect(301,'/newPage.html')
});

router.all('/500(.html)?$',(req, res) => {
  res.status(500).sendFile(path.join(__dirname,'..','views','500.html'))
});





module.exports = router;