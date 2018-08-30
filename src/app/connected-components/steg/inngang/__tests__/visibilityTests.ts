import { default as fns } from './../visibility';
import { SøkerRolle } from '../../../../types/søknad/Søknad';

describe('Inngangssteg visbility tester', () => {
    it('SøkerrolleSpørsmål should be visible when roles exist', () => {
        const roller: SøkerRolle[] = [SøkerRolle.MOR, SøkerRolle.MEDMOR];

        expect(fns.søkerRolleSpørsmål(roller)).toBe(true);
    });

    it('SøkerrolleSpørsmål should not be visible when roles do not exist', () => {
        const roller: SøkerRolle[] = [];

        expect(fns.søkerRolleSpørsmål(roller)).toBe(false);
    });
});
