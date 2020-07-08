'use strict';


const curseforge = require("mc-curseforge-api");
const readModConfig = require('./utils/readModConfig');
const writeModList = require('./utils/writeModList');
const downloadFile = require('./utils/downloadFile');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');
const _colors = require('colors');
const PromisePool = require('@supercharge/promise-pool')


exports.command = 'fetch';

exports.desc = 'Fetch mods';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

const fetch = async function (argv) {

    const config = readModConfig()
    const { modList } = config
    const modPath = path.join(process.cwd(), 'mods')

    if (fs.existsSync(modPath) == false)
        fs.mkdirSync(modPath);

    const progressBar = new cliProgress.SingleBar({
        format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    progressBar.start(Object.keys(modList).length, 0);


    await PromisePool
        .for(Object.keys(modList))
        .process(async key => {
            const mod = modList[key]

            if (fs.existsSync(modPath) == false)
                fs.mkdirSync(modPath);

            if (fs.existsSync(path.join(modPath, `${mod.filename}.disabled`)))
                fs.unlinkSync(path.join(modPath, `${mod.filename}.disabled`));

            if (fs.existsSync(path.join(modPath, mod.filename)))
                fs.unlinkSync(path.join(modPath, mod.filename));

            if (mod.enable == true) {
                return downloadFile({
                    url: mod.file_url,
                    store: path.join(modPath, mod.filename)
                }).then(_ => progressBar.increment())
            }
            else if (mod.enable == false) {
                return downloadFile({
                    url: mod.file_url,
                    store: path.join(modPath, `${mod.filename}.disabled`)
                }).then(_ => progressBar.increment())
            }
            progressBar.increment()
            return
        })

    progressBar.stop()
}

exports.handler = fetch

module.exports.fetch = fetch
