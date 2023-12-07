const path = require('path');
const fs = require('fs');

const MELLOMLAGRET_DATA_FILNAVN = 'mellomlagretdata.json';

const getFilePath = function (filnavn) {
    const directories = ['./mock-api/', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFilePathMellomlagretData = function () {
    const directories = ['./mock-api/', MELLOMLAGRET_DATA_FILNAVN];
    return directories.join(path.sep);
};

const updateSoknad = function (soknadsdata) {
    const fileName = getFilePathMellomlagretData();
    fs.writeFileSync(fileName, JSON.stringify(soknadsdata, null, 4));
};

const deleteSoknad = function () {
    const fileName = getFilePathMellomlagretData();
    fs.openSync(fileName, 'w');
};

const getSoknad = function () {
    const fileName = getFilePathMellomlagretData();
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

const getStønadskontoer = function () {
    const fileName = getFilePath('stønadskontoer.json');
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

const getSaker = function () {
    const fileName = getFilePath('saker.json');
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

const getAnnenPartVedtak = function () {
    const fileName = getFilePath('annenPartVedtak.json');
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

const getUttaksplanannen = function () {
    const fileName = getFilePath('uttaksplanannen.json');
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

const getStorageKvittering = function () {
    const fileName = getFilePath('storage_kvittering.json');
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
    updateSoknad,
    deleteSoknad,
    getSoknad,
    getSokerInfo,
    getStønadskontoer,
    getSoknadSendt,
    getSaker,
    getAnnenPartVedtak,
    getStorageKvittering,
    getUttaksplan,
    getUttaksplanannen,
};
