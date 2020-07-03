'use strict';


exports.command = 'fetch';

exports.desc = 'Fetch mods';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = function (argv) {
    console.log(exports.desc)
}
