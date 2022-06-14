const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const http = require('node:http');
const getContentType = require('./js/getContentType')
const getDirName = require('./js/getDirName');

const PORT = process.env.PORT || 3500;
const server = http.createServer(async (req, res) => {
    const url = req.url;
    let contentType = getContentType(path.extname(url))
    let fullPath = path.join(__dirname,getDirName(url));
    let codeType = contentType == 'text/html' ? 'utf8' : '';

    if(!fs.existsSync(fullPath)) {
        fullPath = path.join(__dirname,'404.html');
        codeType = 'utf8';
        contentType = 'text/html';
    }

    try {
        const data = await fsPromises.readFile(fullPath,codeType)
        res.writeHead(200, { 'Content-Type': contentType })
        res.write(data,codeType);
        res.end();
    } catch (error) {
        console.log(error);
    }

  });


 
  server.on('error', err =>{
    console.error(err);
  })

  server.listen(PORT)
