import { Næring, NæringPartial } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { er4ÅrSidenOppstartEllerMindre } from '../næringer';
import DateValues from '../../validation/values';
import { createDatoInputVerdiFromDate } from '../../../../common/components/skjema/elements/dato-input/datoInputUtils';

const næringMock: NæringPartial = { tidsperiode: {} };

describe('næringUtils', () => {
    describe('er4ÅrSidenOppstartEllerMindre', () => {
        it('should return true if næring.tidsperiode.fom is equal to or less than 4 years ago', () => {
            næringMock.tidsperiode!.fom = createDatoInputVerdiFromDate(DateValues.date4YearsAgo.toDate());
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(true);
        });

        it('should return false if næring.tidsperiode.fom is more than 4 years ago', () => {
            næringMock.tidsperiode!.fom = createDatoInputVerdiFromDate(DateValues.dateMoreThan4YearsAgo.toDate());
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(false);
        });
    });
});
