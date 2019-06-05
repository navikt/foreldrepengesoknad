import { default as fns } from '../visibility';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';

describe('Inngangssteg visbility tester', () => {
    it('SøkerrolleSpørsmål should be visible when roles exist and sitasjon is fødsel', () => {
        const velgbareRoller: SøkerRolle[] = [SøkerRolle.MOR, SøkerRolle.MEDMOR];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FØDSEL, velgbareRoller })).toBeTruthy();
    });

    it('SøkerrolleSpørsmål should not be visible when sitausjon is foreldreansvar or adopsjon', () => {
        const velgbareRoller: SøkerRolle[] = [SøkerRolle.MOR, SøkerRolle.MEDMOR];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, velgbareRoller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, velgbareRoller: [] })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.ADOPSJON, velgbareRoller })).toBeFalsy();
    });

    it('SøkerrolleSpørsmål should not be visible when roles do not exist', () => {
        const velgbareRoller: SøkerRolle[] = [];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FØDSEL, velgbareRoller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.ADOPSJON, velgbareRoller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, velgbareRoller })).toBeFalsy();
    });
});
