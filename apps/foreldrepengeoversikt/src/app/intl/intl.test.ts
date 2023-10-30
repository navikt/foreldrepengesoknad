import { extract } from '@formatjs/cli-lib';
import glob from 'fast-glob';
import fs from 'node:fs';

import nb from './nb_NO.json';

describe('intl foreldrepengeoversikt', () => {
    const regex = /(?<=(intlUtils\(intl,\s'))[^']*/gm;

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
            // Ikkje sjekk denne sidan den er dynamisk i kode (og tungvindt å skriva om)
            if (key.includes('ettersendelse.')) {
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
