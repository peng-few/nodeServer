const { format } = require('date-fns')
const { v4 :uuid } = require('uuid'); 
const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const logEvent = async (msg,fileName) => {
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromise.mkdir(path.join(__dirname,'..','logs'))
        }
        // const date = format(new Date(), 'yyyy-MM-dd'); 
        const time = format(new Date(), 'yyyy-MM-dd hh:mm:ss'); 
        const id = uuid();
        const logMsg = `${msg}\t ${time}\t ${id}\n`;
        await fsPromise.appendFile(path.join(__dirname,'..','logs',`${fileName}.txt`),logMsg)
    } catch (error) {
        console.error(error);
    }
}
module.exports = logEvent;