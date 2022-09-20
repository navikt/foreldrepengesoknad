import { skalViseInfoOmPrematuruker } from './uttaksplanInfoUtils';

describe('uttaksplanInfoUtils', () => {
    it('skalViseInfoOmPrematuruker - ikke vis info om prematuruker hvis adopsjon', () => {
        const resultat = skalViseInfoOmPrematuruker(new Date('2022-01-08'), new Date('2022-01-08'), 'adopsjon');
        expect(resultat).toEqual(false);
    });
    it('skalViseInfoOmPrematuruker - ikke vis info om prematuruker hvis ingen info om termindato', () => {
        const resultat = skalViseInfoOmPrematuruker(new Date('2022-01-08'), undefined, 'fødsel');
        expect(resultat).toEqual(false);
    });
    it('skalViseInfoOmPrematuruker - ikke vis info om prematuruker hvis ingen info om fødselsdato', () => {
        const resultat = skalViseInfoOmPrematuruker(undefined, new Date('2022-01-08'), 'fødsel');
        expect(resultat).toEqual(false);
    });
    // it('skalViseInfoOmPrematuruker - ikke vis info om prematuruker hvis fødselsdato er før første juli 2019', () => {
    //     const resultat = skalViseInfoOmPrematuruker(new Date('2019-06-30'), new Date('2019-06-30'), 'fødsel');
    //     expect(resultat).toEqual(false);
    // });
    // it('skalViseInfoOmPrematuruker - ikke vis info om prematuruker hvis ikke er prematur fødsel', () => {
    //     const resultat = skalViseInfoOmPrematuruker(new Date('2021-08-01'), new Date('2021-08-01'), 'fødsel');
    //     expect(resultat).toEqual(false);
    // });
    // it('skalViseInfoOmPrematuruker -  vis info om prematuruker hvis er prematur fødsel', () => {
    //     const resultat = skalViseInfoOmPrematuruker(new Date('2021-07-10'), new Date('2021-08-01'), 'fødsel');
    //     expect(resultat).toEqual(true);
    // });
});
