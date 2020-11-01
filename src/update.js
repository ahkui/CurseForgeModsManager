'use strict';

const ask = require('./utils/ask');
const curseforge = require("mc-curseforge-api");
const { show } = require('./show')
const readModList = require('./utils/readModList');
const writeModList = require('./utils/writeModList');
const parsedModList = require('./utils/parsedModList');
const parsedFileList = require('./utils/parsedFileList');
const checkIsLatest = require('./utils/checkIsLatest');

exports.command = 'update';

exports.desc = 'Update mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

exports.handler = async function (argv) {
    while (true) {
        await show();

        const localModList = (await readModList());
        const mods = Object.keys(localModList).map(key => {
            const mod = localModList[key];
            mod.key = key;
            return mod
        })

        let currentPage = 0;
        let selectIndex = ''

        // Select Mod
        while (true) {
            selectIndex = ''
            while (selectIndex == '' || selectIndex < 0 || selectIndex >= mods.length) {
                selectIndex = await ask("Select mod(index; 'q' to exit): ")

                if (selectIndex == 'q')
                    return
            }

            if (mods[selectIndex] == undefined)
                continue
            break
        }

        const selectedMod = mods[selectIndex]

        const files = (await curseforge.getModFiles(selectedMod.mod_id)).sort((a, b) => {
            const left = new Date(b.timestamp);
            const right = new Date(a.timestamp);

            if (left < right) {
                return -1;
            }
            if (left > right) {
                return 1;
            }

            return 0;
        }).chunk(10)
        currentPage = 0

        while (true) {
            selectIndex = '';
            while (selectIndex == '') {
                console.clear()
                console.log(`Current mod: ${selectedMod.name}`)
                console.table(parsedFileList(files[currentPage]))
                console.log(`Page: ${currentPage + 1}/${files.length} (Tips: \`b\` prev page, \`n\` next page)`);

                selectIndex = await ask("Select file(index): ");
            }

            if (selectIndex == 'b') {
                if (currentPage > 0)
                    currentPage -= 1;
                continue
            } else if (selectIndex == 'n') {
                console.log(currentPage < files.length, currentPage, files.length)
                if (currentPage < files.length - 1)
                    currentPage += 1;
                continue
            }

            if (files[currentPage][selectIndex] == undefined)
                continue

            break
        }
        const selectedFile = files[currentPage][selectIndex]

        localModList[selectedMod.key].file_id = selectedFile.id
        localModList[selectedMod.key].file_url = selectedFile.download_url

        await writeModList(localModList);

        console.log('Done!')
    }
}
