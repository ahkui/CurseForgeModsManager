const curseforge = require("mc-curseforge-api");

module.exports = async function ({ modId, currentFileId }) {
    const mod = await curseforge.getMod(modId)
    for (const file of mod.latestFiles) {
        const { id } = file;
        if (id == currentFileId) return true;
    }
    return false;
}
