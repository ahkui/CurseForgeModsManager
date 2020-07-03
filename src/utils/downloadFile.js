const axios = require('axios');
const FileDownload = require('js-file-download');



module.exports = function (link, path) {
    return axios.get(link)
        .then((response) => {
            FileDownload(response.data, path);
            return response
        });
}
