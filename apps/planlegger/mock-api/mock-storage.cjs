const path = require('path');
const fs = require('fs');

const getFilePath = function (filnavn) {
    const directories = ['./mock-api/', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFileContent = function (filnavn) {
    const fileName = getFilePath(filnavn);
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

const getSokerinfo = function () {
    return getFileContent('sokerinfo.json');
};

module.exports = {
    getSokerinfo,
};
