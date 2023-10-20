import glob from 'fast-glob';
import { extract } from '@formatjs/cli-lib';
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

    //TODO Denne sjekker ikke alle strings. Greier kun å henta en del fra kode, men ikke alle.
    // Hadde ein henta alle så kunne ein sjekka begge vegar.
    it('Check that i18n strings in code exists in nb_NO language file', async () => {
        const files = await glob('src/**/*.{ts,tsx}');
        const foundTranslations = await extract(files, {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
        });

        const foundKeys = Object.keys(JSON.parse(foundTranslations));

        const missingKeysBokmål = foundKeys.filter((key) => !Object.keys(nb).includes(key));
        missingKeysBokmål.forEach((key) => console.log('key ' + key + ' not found in nn_NO.json.'));
        expect(missingKeysBokmål.length).toBe(0);
    });
});
