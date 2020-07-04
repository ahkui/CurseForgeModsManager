'use strict';

const ask = require('./utils/ask');
const curseforge = require("mc-curseforge-api");
const readModList = require('./utils/readModList');
const writeModList = require('./utils/writeModList');
const genListItem = require('./utils/genListItem');

exports.command = 'add';

exports.desc = 'Add new mod';

exports.builder = function (yargs) {
    return yargs
        .help('h');
}

const parsedModList = (m) => m.map((mod) => {
    return {
        Key: mod.key,
        Name: mod.name,
        URL: mod.url,
    }
});

const getFileName = (f) => {
    const urlArr = f.download_url.split('/');
    return urlArr[urlArr.length - 1]
}

const parsedFileList = (f) => f.map((file) => {
    return {
        'MC Version': file.minecraft_versions.join(", "),
        'Files': getFileName(file),
        'Upload Date': new Date(file.timestamp),
    }
})

exports.handler = async function (argv) {
    let currentPage = 0;
    let selectIndex = ''

    // Input Search Query
    while (selectIndex == '') {
        console.clear()
        selectIndex = await ask("Mod Search: ");
    }

    // Search Mod
    const mods = (await curseforge.getMods({
        searchFilter: selectIndex,
    })).chunk(10)

    const searchQuery = selectIndex;

    // Select Mod
    while (true) {
        selectIndex = ''
        while (selectIndex == '' || selectIndex < 0 || selectIndex > 9 || selectIndex >= mods.length) {
            console.clear()

            console.table(parsedModList(mods[currentPage]))
            console.log(`Page: ${currentPage + 1}/${mods.length} (Tips: \`b\` prev page, \`n\` next page)`);

            selectIndex = await ask("Select mod(index): ");
        }

        if (selectIndex == 'b') {
            if (currentPage > 0)
                currentPage -= 1;
            continue
        } else if (selectIndex == 'n') {
            console.log(currentPage < mods.length, currentPage, mods.length)
            if (currentPage < mods.length - 1)
                currentPage += 1;
            continue
        }
        if (mods[currentPage][selectIndex] == undefined)
            continue
        break
    }

    const selectedMod = mods[currentPage][selectIndex]

    const files = (await selectedMod.getFiles()).sort((a, b) => {
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

            selectIndex = await ask("Select mod index: ");
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
    console.log(selectedFile)

    console.log(genListItem({
        query: searchQuery,
        mod: selectedMod,
        file: selectedFile,
    }))

    const mData = await readModList();

    mData[selectedMod.key] = genListItem({
        query: searchQuery,
        mod: selectedMod,
        file: selectedFile,
    })

    await writeModList(mData);

    console.clear()
    console.log(`Your mods: ${Object.keys(mData).map((k) => mData[k].name).join(', ')}`)
    console.log('Done!')




    // TODO add to modlist.json


}
