const nb = require('../messages/nb_NO.json');
const nn = require('../messages/nn_NO.json');
const en = require('../messages/en_US.json');

describe('intl tests', () => {
    it('Language files should have exactly the same keys', () => {
        const keysBokmål = Object.keys(nb).sort();
        const keysNynorsk = Object.keys(nn).sort();
        const keysEnglish = Object.keys(en).sort();

        expect(keysBokmål).toMatchObject(keysNynorsk);
        expect(keysBokmål).toMatchObject(keysEnglish);

        expect(keysNynorsk).toMatchObject(keysBokmål);
        expect(keysNynorsk).toMatchObject(keysEnglish);

        expect(keysEnglish).toMatchObject(keysBokmål);
        expect(keysEnglish).toMatchObject(keysNynorsk);
    });
});
