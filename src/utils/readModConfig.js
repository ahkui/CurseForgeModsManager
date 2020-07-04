const fs = require('fs');
const path = require('path');

module.exports = function () {
    const modListPath = path.join(process.cwd(), 'cfd_mod_config.json');
    return fs.existsSync(modListPath) ? JSON.parse(fs.readFileSync(
        modListPath
    )) : {
            server: null,
            modList: {}
        };
}

