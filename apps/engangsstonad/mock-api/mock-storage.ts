import fs from 'node:fs';
import path from 'node:path';

import { EsDataMapAndMetaData } from '../src/app-data/useEsMellomlagring';
import * as mellomlagring from './mellomlagretdata.json';

const FILE_NAME = 'mellomlagretdata.json';

const getFilePath = () => {
    const directories = ['./mock-api/', FILE_NAME];
    return directories.join(path.sep);
};

export const getMellomlagretData = () => {
    return mellomlagring as Partial<EsDataMapAndMetaData>;
};

export const lagreMellomlagretData = (soknadsdata: Partial<EsDataMapAndMetaData>) => {
    fs.writeFileSync(getFilePath(), JSON.stringify(soknadsdata, null, 4));
};

export const deleteMellomlagretData = function () {
    fs.openSync(getFilePath(), 'w');
};
