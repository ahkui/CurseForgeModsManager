'use strict';


exports.command = 'sync';

exports.desc = 'Sync with server mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = function (argv) {
    console.log(exports.desc)
}
