const fs = require('fs');
const path = require('path');

module.exports = function (f) {
    if (f == undefined)
        throw "arg is empty!";

    fs.writeFileSync(path.join(process.cwd(), 'cmm_config.json'), JSON.stringify(f, null, 4));
}
