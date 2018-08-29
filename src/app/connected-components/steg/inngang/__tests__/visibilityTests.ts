import { default as fns } from './../visibility';
import { SøkerRolle } from '../../../../types/søknad/Søknad';

let roller: SøkerRolle[] = [];

describe('Inngangssteg visbility tester', () => {
    it('SøkerrolleSpørsmål should be visible when roles exist', () => {
        roller = [SøkerRolle.MOR, SøkerRolle.MEDMOR];

        expect(fns.søkerRolleSpørsmål(roller)).toBe(true);
    });

    it('SøkerrolleSpørsmål should not be visible when roles do not exist', () => {
        roller = [];

        expect(fns.søkerRolleSpørsmål(roller)).toBe(false);
    });
});
