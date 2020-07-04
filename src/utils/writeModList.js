const fs = require('fs');
const path = require('path');
const writeModConfig = require('./writeModConfig');
const readModConfig = require('./readModConfig');

module.exports = function (f) {
    if (f == undefined)
        throw "arg is empty!";

    const config = readModConfig()

    config.modList = f;

    writeModConfig(config);

}
