const path = require('path');

module.exports = (url) => {
    if(path.extname(url)) return url;
    return path.basename(url) == '' || url.substr(-1) =="/" ? `${url}index.html` : `${url}.html`
}