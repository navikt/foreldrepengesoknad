import { Næring, NæringPartial } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { er4ÅrSidenOppstartEllerMindre } from '../næringer';
import DateValues from '../../validation/values';

const næringMock: NæringPartial = { tidsperiode: {} };

describe('næringUtils', () => {
    describe('er4ÅrSidenOppstartEllerMindre', () => {
        it('should return true if næring.tidsperiode.fom is equal to or less than 4 years ago', () => {
            næringMock.tidsperiode!.fom = DateValues.date4YearsAgo.toDate();
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(true);
        });

        it('should return false if næring.tidsperiode.fom is more than 4 years ago', () => {
            næringMock.tidsperiode!.fom = DateValues.dateMoreThan4YearsAgo.toDate();
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(false);
        });
    });
});
