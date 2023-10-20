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
});
