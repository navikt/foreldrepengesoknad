import nb from './nb_NO.json';
import nn from './nn_NO.json';

describe('intl tests', () => {
    it('Bokmål and nynorsk files should have exactly the same keys', () => {
        const missingKeysBokmål = Object.keys(nb).filter((key) => !Object.keys(nn).includes(key));
        const missingKeysNynorsk = Object.keys(nn).filter((key) => !Object.keys(nb).includes(key));
        // eslint-disable-next-line no-console
        missingKeysBokmål.forEach((key) => console.error('key ' + key + ' not found in nn_NO.json.'));
        // eslint-disable-next-line no-console
        missingKeysNynorsk.forEach((key) => console.error('key ' + key + ' not found in nb_NO.json'));

        expect(missingKeysBokmål.length).toBe(0);
        expect(missingKeysNynorsk.length).toBe(0);
        expect(true).toBe(true);
    });
});
