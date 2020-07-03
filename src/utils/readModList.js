const fs = require('fs');
const path = require('path');

module.exports = function () {
    return JSON.parse(fs.readFileSync(
        path.join(process.cwd(), 'modlist.json')
    ));
}

