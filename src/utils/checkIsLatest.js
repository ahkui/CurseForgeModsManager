const curseforge = require("mc-curseforge-api");

let data = {};

module.exports = async function ({ modId, currentFileId }) {
    const mod = data[modId] || await curseforge.getMod(modId)
    data[modId] = mod;
    for (const file of mod.latestFiles) {
        const { id } = file;
        if (id == currentFileId) return true;
    }
    return false;
}
