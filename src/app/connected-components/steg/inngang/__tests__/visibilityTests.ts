import { default as fns } from './../visibility';
import { SøkerRolle, Søkersituasjon } from '../../../../types/søknad/Søknad';

describe('Inngangssteg visbility tester', () => {
    it('SøkerrolleSpørsmål should be visible when roles exist and sitasjon is fødsel or adopsjon', () => {
        const roller: SøkerRolle[] = [SøkerRolle.MOR, SøkerRolle.MEDMOR];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FØDSEL, roller })).toBeTruthy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.ADOPSJON, roller })).toBeTruthy();
    });

    it('SøkerrolleSpørsmål should not be visible when sitausjon is foreldreansvar', () => {
        const roller: SøkerRolle[] = [SøkerRolle.MOR, SøkerRolle.MEDMOR];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, roller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, roller: [] })).toBeFalsy();
    });

    it('SøkerrolleSpørsmål should not be visible when roles do not exist', () => {
        const roller: SøkerRolle[] = [];
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FØDSEL, roller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.ADOPSJON, roller })).toBeFalsy();
        expect(fns.søkerRolleSpørsmål({ situasjon: Søkersituasjon.FORELDREANSVAR, roller })).toBeFalsy();
    });
});
