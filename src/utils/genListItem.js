


module.exports = function ({ query, mod, file, mode = "curseforge" }) {
    return {
        searchQuery: query,
        filename: `${mod.key}.jar`,
        name: mod.name,
        mod_id: mod.id,
        mod_url: mod.url,
        file_id: file.id,
        file_url: file.download_url,
        file_md5: undefined,
        mode: mode,
        enable: true
    };
}
