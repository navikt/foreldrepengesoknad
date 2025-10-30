import fs from 'node:fs';
import path from 'node:path';

import { EsDataMapAndMetaData } from '../src/app-data/useEsMellomlagring';

const FILE_NAME = 'mellomlagretdata.json';

const getFilePath = () => {
    const directories = ['./mock-api/', FILE_NAME];
    return directories.join(path.sep);
};

export const getMellomlagretData = () => {
    try {
        const raw = fs.readFileSync(getFilePath(), 'utf8');
        return JSON.parse(raw) as EsDataMapAndMetaData;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        // file missing or invalid -> return empty structure compatible with EsDataMapAndMetaData
        return {} as EsDataMapAndMetaData;
    }
};

export const lagreMellomlagretData = (soknadsdata: EsDataMapAndMetaData) => {
    fs.writeFileSync(getFilePath(), JSON.stringify(soknadsdata, null, 4));
};

export const deleteMellomlagretData = function () {
    fs.openSync(getFilePath(), 'w');
};
