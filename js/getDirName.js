const path = require('path');

module.exports = (url) => {
    console.log(path.parse(url))
    if(path.extname(url)) return url;
    return path.basename(url) == '' || url.substr(-1) =="/" ? `${url}index.html` : `${url}.html`
}