import { extract } from '@formatjs/cli-lib';
import glob from 'fast-glob';
import fs from 'node:fs';

import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';
import en from './messages/en_US.json';

describe('intl messages', () => {
    it('Check that bokmål og nynorsk language files contain the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(nn).includes(key));
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(nb).includes(key));

        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in nn_NO.json.'));
        missingKeysNynorsk.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysNynorsk.length).toBe(0);
    });

    it('Check that bokmål og english language files contain the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(en).includes(key));
        const missingKeysEnglish = Object.keys(en).filter((key) => !Object.keys(nb).includes(key));

        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in en_US.json.'));
        missingKeysEnglish.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysEnglish.length).toBe(0);
    });

    it('Check that nynorsk og english language files contain the same keys', () => {
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(en).includes(key));
        const missingKeysEnglish = Object.keys(en).filter((key) => !Object.keys(nb).includes(key));

        missingKeysNynorsk.forEach((key) => console.log('key ' + key + ' not found in en_US.json.'));
        missingKeysEnglish.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysNynorsk.length).toBe(0);
        expect(missingKeysEnglish.length).toBe(0);
    });

    const regex = /(?<=(i18n)\(')[^']*/gm;

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
            // Ikkje sjekk denne sidan den er dynamisk, og derfor litt styr å skriva anleis i kode sidan den dynamiske delen er ni-delt
            if (key.includes('AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.')) {
                return false;
            }
            return !allTranslationsCode.includes(key);
        });
        if (missingKeysCode.length > 0) {
            console.log('Not found in code:');
        }
        missingKeysCode.forEach((key) => console.log('key ' + key));
        expect(missingKeysCode.length).toBe(0);
    });
});
