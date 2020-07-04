const fs = require('fs');
const path = require('path');

module.exports = function () {
    const modListPath = path.join(process.cwd(), 'cmm_config.json');
    return fs.existsSync(modListPath) ? JSON.parse(fs.readFileSync(
        modListPath
    )).modList : {};
}

