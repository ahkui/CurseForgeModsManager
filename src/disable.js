'use strict';

const ask = require('./utils/ask');
const curseforge = require("mc-curseforge-api");
const { show } = require('./show')
const readModList = require('./utils/readModList');
const writeModList = require('./utils/writeModList');
const parsedModList = require('./utils/parsedModList');
const parsedFileList = require('./utils/parsedFileList');
const checkIsLatest = require('./utils/checkIsLatest');
const path = require('path');
const fs = require('fs');

exports.command = 'disable';

exports.desc = 'Disable mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = async function (argv) {
    await show();

    const localModList = (await readModList());
    const mods = Object.keys(localModList).map(key => {
        const mod = localModList[key];
        mod.key = key;
        return mod
    })

    let selectIndex = ''

    while (selectIndex == '' || selectIndex < 0 || selectIndex >= mods.length) {
        selectIndex = await ask("Select to disable mod(index): ");
    }

    const selectedMod = mods[selectIndex]
    selectedMod.enable = false;
    const modPath = path.join(process.cwd(), 'mods')

    if (fs.existsSync(modPath) == false)
        fs.mkdirSync(modPath);

    if (fs.existsSync(path.join(modPath, selectedMod.filename)))
        fs.renameSync(path.join(modPath, selectedMod.filename), path.join(modPath, `${selectedMod.filename}.disabled`));

    await writeModList(localModList);

    console.log('Done!')
}
