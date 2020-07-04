

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

module.exports = parsedFileList
