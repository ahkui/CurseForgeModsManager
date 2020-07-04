


module.exports = function ({ query, mod, file, mode = "curseforge" }) {
    return {
        searchQuery: query,
        filename: `${mod.key}.jar`,
        name: mod.name,
        mod_id: mod.id,
        url: mod.url,
        file_id: file.id,
        download: file.download_url,
        mode: mode,
        enable: true
    };
}
