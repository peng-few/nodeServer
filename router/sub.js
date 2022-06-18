const express = require('express')
const router = express.Router();
const path = require('path');

//設定sub directory 的對應 file 位置
router.use(express.static('public'))
router.get('/|/index(.html)?$', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views/sub','index.html'))
});

router.get('/test(.html)?$', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views/sub','test.html'))
});

module.exports = router;