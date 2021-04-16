import { getSøkerrollerForBruker } from '../søkerrollerUtils';
import { Kjønn } from '../../../types/common';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';

describe('getSøkerrollerForBruker', () => {
    it('should return correct list of SøkerRolle when situasjon is Søkersituasjon.FØDSEL', () => {
        expect(getSøkerrollerForBruker(Kjønn.KVINNE, Søkersituasjon.FØDSEL)).toEqual([
            SøkerRolle.MOR,
            SøkerRolle.MEDMOR,
        ]);
        expect(getSøkerrollerForBruker(Kjønn.MANN, Søkersituasjon.FØDSEL)).toEqual([]);
    });

    it('should return correct list of SøkerRolle when situasjon is Søkersituasjon.ADOPSJON', () => {
        expect(getSøkerrollerForBruker(Kjønn.KVINNE, Søkersituasjon.ADOPSJON)).toEqual([SøkerRolle.MOR]);
        expect(getSøkerrollerForBruker(Kjønn.MANN, Søkersituasjon.ADOPSJON)).toEqual([SøkerRolle.FAR]);
    });
});
