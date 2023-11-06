import glob from 'fast-glob';
import { extract } from '@formatjs/cli-lib';
import fs from 'fs';
const nb = require('../nb_NO.json');
const nn = require('../nn_NO.json');

describe('intl tests', () => {
    it('Bokmål and nynorsk files should have exactly the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(nn).includes(key));
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(nb).includes(key));
        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in nn_NO.json.'));
        missingKeysNynorsk.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysNynorsk.length).toBe(0);
    });

    const regex = /(?<=(intlUtils\(\s*intl,\s*'))[^']*/gm;

    const getAdditionalIntlString = (fileLoc: string) => {
        const fileBuffer = fs.readFileSync(fileLoc);
        const matches = fileBuffer.toString().match(regex);
        return matches || [];
    };

    it('Check that i18n strings in code exists in nb_NO language file', async () => {
        const files = await glob('src/**/*.{ts,tsx}');

        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });
        const additionalTranslations = files.reduce(
            (prev, fileLoc) => prev.concat(getAdditionalIntlString(fileLoc)),
            [] as string[],
        );

        const allTranslationsCodes = Object.keys(JSON.parse(foundTranslations)).concat(additionalTranslations);

        const missingKeysBokmål = allTranslationsCodes.filter((key) => !Object.keys(nb).includes(key));
        if (missingKeysBokmål.length > 0) {
            console.log('Not found in nb_NO.json:');
        }
        missingKeysBokmål.forEach((key) => console.log('key ' + key));
        expect(missingKeysBokmål.length).toBe(0);
    });

    it('Check that all i18n strings nb_NO language file exists in code', async () => {
        const files = await glob('src/**/*.{ts,tsx}');
        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });
        const additionalTranslations = files.reduce(
            (prev, fileLoc) => prev.concat(getAdditionalIntlString(fileLoc)),
            [] as string[],
        );
        const allTranslationsCode = Object.keys(JSON.parse(foundTranslations)).concat(additionalTranslations);

        const missingKeysCode = Object.keys(nb).filter((key) => {
            return !allTranslationsCode.includes(key);
        });
        if (missingKeysCode.length > 0) {
            console.log('Not found in code:');
        }
        missingKeysCode.forEach((key) => console.log('key ' + key));
        expect(missingKeysCode.length).toBe(0);
    });
});
