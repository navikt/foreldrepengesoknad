const path = require('node:path');
const fs = require('node:fs');

const FILE_NAME = 'mellomlagretdata.json';

const getFilePath = function () {
    const directories = ['./mock-api/', FILE_NAME];
    return directories.join(path.sep);
};

const getMellomlagretData = function () {
    if (!fs.existsSync(getFilePath())) {
        return undefined;
    } else {
        try {
            return JSON.parse(fs.readFileSync(getFilePath(), 'utf8'));
        } catch {
            return undefined;
        }
    }
};

const lagreMellomlagretData = function (soknadsdata) {
    fs.writeFileSync(getFilePath(), JSON.stringify(soknadsdata, null, 4));
};

const deleteMellomlagretData = function () {
    fs.openSync(getFilePath(), 'w');
};

module.exports = {
    getMellomlagretData,
    lagreMellomlagretData,
    deleteMellomlagretData,
};
