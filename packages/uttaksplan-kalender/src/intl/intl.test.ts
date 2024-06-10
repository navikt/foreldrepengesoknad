import { extract } from '@formatjs/cli-lib';
import glob from 'fast-glob';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

describe('uttaksplan-kalender - intl messages', () => {
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

    it('Check that i18n strings in code exists in nb_NO language file', async () => {
        const files = await glob('src/**/*.{ts,tsx}');

        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });

        const missingKeysBokmål = Object.keys(JSON.parse(foundTranslations)).filter(
            (key) => !Object.keys(nb).includes(key),
        );
        if (missingKeysBokmål.length > 0) {
            console.log('Not found in nb_NO.json:');
        }
        missingKeysBokmål.forEach((key) => console.log('key ' + key));
        expect(missingKeysBokmål.length).toBe(0);
    });

    it('Check that all i18n strings nb_NO language file exists in code', async () => {
        const files = await glob('src/**/*.{ts,tsx}');
        const foundTranslations = Object.keys(
            JSON.parse(
                await extract(files, {
                    idInterpolationPattern: '[sha512:contenthash:base64:6]',
                }),
            ),
        );

        const missingKeysCode = Object.keys(nb).filter((key) => {
            return !foundTranslations.includes(key);
        });
        if (missingKeysCode.length > 0) {
            console.log('Not found in code:');
        }
        missingKeysCode.forEach((key) => console.log('key ' + key));
        expect(missingKeysCode.length).toBe(0);
    });
});
