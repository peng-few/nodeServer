module.exports = (extName) => {
    switch (extName) {
        case '.js':
            return 'text/javascript'
        case '.css':
            return 'text/css'
        case '.png':
            return 'image/png'
        case '.json':
            return 'application/json'
        case 'jpg':
            return 'image/jpg'
        case '.html':
        default:
            return 'text/html'
    }
};