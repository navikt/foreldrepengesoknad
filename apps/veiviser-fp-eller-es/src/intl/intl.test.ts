import { extract } from '@formatjs/cli-lib';
import glob from 'fast-glob';

import en from './messages/en_US.json';
import nb from './messages/nb_NO.json';
import nn from './messages/nn_NO.json';

describe('intl messages', () => {
    it('Check that bokmål og nynorsk language files contain the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(nn).includes(key));
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(nb).includes(key));

        // eslint-disable-next-line no-console
        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in nn_NO.json.'));
        // eslint-disable-next-line no-console
        missingKeysNynorsk.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysNynorsk.length).toBe(0);
    });

    it('Check that bokmål og english language files contain the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(en).includes(key));
        const missingKeysEnglish = Object.keys(en).filter((key) => !Object.keys(nb).includes(key));

        // eslint-disable-next-line no-console
        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in en_US.json.'));
        // eslint-disable-next-line no-console
        missingKeysEnglish.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysEnglish.length).toBe(0);
    });

    it('Check that nynorsk og english language files contain the same keys', () => {
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(en).includes(key));
        const missingKeysEnglish = Object.keys(en).filter((key) => !Object.keys(nb).includes(key));

        // eslint-disable-next-line no-console
        missingKeysNynorsk.forEach((key) => console.log('key ' + key + ' not found in en_US.json.'));
        // eslint-disable-next-line no-console
        missingKeysEnglish.forEach((key) => console.log('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysNynorsk.length).toBe(0);
        expect(missingKeysEnglish.length).toBe(0);
    });

    it('Check that i18n strings in code exists in nb_NO language file', async () => {
        const files = await glob('src/**/*.{ts,tsx}');

        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });

        const allTranslationsCodes = Object.keys(JSON.parse(foundTranslations));

        const missingKeysBokmål = allTranslationsCodes.filter((key) => !Object.keys(nb).includes(key));
        if (missingKeysBokmål.length > 0) {
            // eslint-disable-next-line no-console
            console.log('Not found in nb_NO.json:');
        }
        // eslint-disable-next-line no-console
        missingKeysBokmål.forEach((key) => console.log('key ' + key));
        expect(missingKeysBokmål.length).toBe(0);
    });

    it('Check that all i18n strings nb_NO language file exists in code', async () => {
        const files = await glob('src/**/*.{ts,tsx}');
        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });
        const allTranslationsCode = Object.keys(JSON.parse(foundTranslations));

        const missingKeysCode = Object.keys(nb).filter((key) => {
            return !allTranslationsCode.includes(key);
        });
        if (missingKeysCode.length > 0) {
            // eslint-disable-next-line no-console
            console.log('Not found in code:');
        }
        // eslint-disable-next-line no-console
        missingKeysCode.forEach((key) => console.log('key ' + key));
        expect(missingKeysCode.length).toBe(0);
    });
});
