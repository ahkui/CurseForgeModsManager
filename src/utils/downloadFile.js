const fs = require('fs');
const request = require('request');

const download = ({ url, store }) => {
    return new Promise(resolve => {
        request({ url: url })
            .pipe(fs.createWriteStream(store))
            .on('close', resolve);
    })
};

module.exports = download
