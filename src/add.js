'use strict';


exports.command = 'add';

exports.desc = 'Add new mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = function (argv) {
    console.log(exports.desc)
}
