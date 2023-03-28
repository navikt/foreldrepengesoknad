const path = require('path');
const fs = require('fs');

const getFilePath = function (filnavn) {
    var directories = ['./mock-api/', 'mock_data', filnavn];
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

const getDokumenter = function () {
    return getFileContent('dokumenter.json');
};

const getAnnenPartsVedtak = function () {
    return getFileContent('annenPartsVedtak.json');
};

const getSaker = function () {
    return getFileContent('saker.json');
};

const getKvitteringStorage = function () {
    return getFileContent('storage_kvittering.json');
};

const getHistorikk = function () {
    return getFileContent('historikk.json');
};

const getMinidialog = function () {
    return getFileContent('miniDialog.json');
};

const getManglendeVedlegg = function () {
    return getFileContent('manglendeVedlegg.json');
};

const getTidslinjeHendelser = function () {
    return getFileContent('tidslinjeHendelser.json');
};

const getUttaksplan = function () {
    const fileName = getFilePath('uttaksplan.json');
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

module.exports = {
    getSokerinfo,
    getSaker,
    getKvitteringStorage,
    getHistorikk,
    getMinidialog,
    getUttaksplan,
    getDokumenter,
    getManglendeVedlegg,
    getAnnenPartsVedtak,
    getTidslinjeHendelser,
};
