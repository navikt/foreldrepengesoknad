import { formaterNavn, getErSøkerFarEllerMedmor } from '../personUtil';
import { SøkerRolle } from '../../../types/søknad/Søknad';

describe('personUtils', () => {
    describe('getErSøkerFarEllerMedmor', () => {
        it('should return true if SøkerRolle is FAR, MEDMOR or FORESATT2', () => {
            expect(getErSøkerFarEllerMedmor(SøkerRolle.FAR)).toBe(true);
            expect(getErSøkerFarEllerMedmor(SøkerRolle.MEDMOR)).toBe(true);
            expect(getErSøkerFarEllerMedmor(SøkerRolle.FORESATT2)).toBe(true);
        });

        it('should return false if SøkerRolle is neither FAR, MEDMOR, nor FORESATT2', () => {
            expect(getErSøkerFarEllerMedmor(SøkerRolle.MOR)).toBe(false);
            expect(getErSøkerFarEllerMedmor(SøkerRolle.FORESATT)).toBe(false);
            expect(getErSøkerFarEllerMedmor(SøkerRolle.FAR2)).toBe(false);
        });
    });

    describe('formaterNavn', () => {
        it('should format navn containing only fornavn and etternavn correctly', () => {
            expect(formaterNavn('Ola', 'Nordmann')).toBe('Ola Nordmann');
        });

        it('should format navn containing fornavn, etternavn and mellomnavn correctly', () => {
            expect(formaterNavn('Ola', 'Nordmann', 'Foobar')).toBe('Ola Foobar Nordmann');
        });
    });
});
