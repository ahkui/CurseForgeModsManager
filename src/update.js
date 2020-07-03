'use strict';


exports.command = 'update';

exports.desc = 'Update mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = function (argv) {
    console.log(exports.desc)
}
