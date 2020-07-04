#!/usr/bin/env node

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
});

const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .commandDir('src')
    .demandCommand()
    .help('h')
    .alias('h', 'help').argv
