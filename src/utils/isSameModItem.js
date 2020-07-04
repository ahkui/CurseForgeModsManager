


module.exports = function ({ oldMod, newMod }) {
    if (newMod.mode == "custom")
        return newMod.file_md5 == oldMod.file_md5

    return oldMod.mod_id == newMod.mod_id && oldMod.file_id == newMod.file_id;
}
