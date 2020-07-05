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


async function show() {
    console.log('Fetching data from CurseForge...');
    const modList = readModList();

    let latestCount = 0;
    let totalCount = 0;



    const progressBar = new cliProgress.SingleBar({
        format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    progressBar.start(Object.keys(modList).length, 0);

    let promiseList = []
    let printResult = {}

    for (const key in modList) {
        const run = async () => {
            if (modList.hasOwnProperty(key)) {
                const mod = modList[key];
                const result = await checkIsLatest({
                    modId: mod.mod_id,
                    currentFileId: mod.file_id
                });

                printResult[key] = { 'Mod': mod.name, 'HomePage': mod.mod_url, 'Latest(CurseForge)': result, 'Enable': mod.enable }

                if (result)
                    latestCount += 1;
                totalCount += 1;
            }
            progressBar.increment();
        }
        promiseList.push(run())
    }

    await Promise.all(promiseList)

    progressBar.stop();
    console.table(Object.keys(modList).map(key => printResult[key]));


    console.log('Status:', `${latestCount}/${totalCount}`)
}

exports.handler = show
module.exports.show = show
