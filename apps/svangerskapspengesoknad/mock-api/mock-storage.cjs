const path = require('path');
const fs = require('fs');

const MELLOMLAGRET_DATA_FILNAVN = 'mellomlagretdata.json';

const getFilePath = function (filnavn) {
    const directories = ['mock-api', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFilePathMellomlagretData = function () {
    const directories = ['mock-api', MELLOMLAGRET_DATA_FILNAVN];
    return directories.join(path.sep);
};

const updateSoknad = function (soknadsdata) {
    const fileName = getFilePath('soknad.json');
    fs.writeFileSync(fileName, JSON.stringify(soknadsdata, null, 4));
};

const getSoknad = function () {
    const fileName = getFilePath('soknad.json');
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

const getSokerInfo = function () {
    const fileName = getFilePath('sokerinfo.json');
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

const getSoknadSendt = function () {
    const fileName = getFilePath('soknad_sendt.json');
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

const getMellomlagretData = function () {
    const fileName = getFilePathMellomlagretData();
    if (!fs.existsSync(fileName)) {
        return undefined;
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return undefined;
        }
    }
};

const lagreMellomlagretData = function (soknadsdata) {
    fs.writeFileSync(getFilePathMellomlagretData(), JSON.stringify(soknadsdata, null, 4));
};

const deleteMellomlagretData = function () {
    fs.openSync(getFilePathMellomlagretData(), 'w');
};

module.exports = {
    updateSoknad,
    getSoknad,
    getSokerInfo,
    getSoknadSendt,
    getMellomlagretData,
    lagreMellomlagretData,
    deleteMellomlagretData,
};
