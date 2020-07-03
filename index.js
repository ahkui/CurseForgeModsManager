#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .commandDir('src')
    .demandCommand()
    .help('h')
    .alias('h', 'help').argv
