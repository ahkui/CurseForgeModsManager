const readModList = require('./utils/readModList');
const checkIsLatest = require('./utils/checkIsLatest');
const cliProgress = require('cli-progress');
const _colors = require('colors');

'use strict';


exports.command = 'show';

exports.desc = 'Show all mods';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = async function (argv) {
    console.log('Fetching data from CurseForge...');
    const modList = readModList();

    let latestCount = 0;
    let totalCount = 0;

    const structDatas = [

    ];


    const progressBar = new cliProgress.SingleBar({
        format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    progressBar.start(Object.keys(modList).length, 0);

    for (const key in modList) {
        if (modList.hasOwnProperty(key)) {
            const mod = modList[key];
            if (mod.enable) {
                const result = await checkIsLatest({
                    modId: mod.mod_id,
                    currentFileId: mod.file_id
                });
                structDatas.push({ 'Mod': mod.name, 'Latest': result })
                if (result)
                    latestCount += 1;
                totalCount += 1;
            }
        }
        progressBar.increment();
    }

    progressBar.stop();
    console.table(structDatas);


    console.log('Status:', `${latestCount}/${totalCount}`)
}
