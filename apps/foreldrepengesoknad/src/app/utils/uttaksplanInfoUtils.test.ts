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
});
