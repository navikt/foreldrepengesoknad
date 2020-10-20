import { createDatoInputVerdiFromDate } from '../../../../common/components/skjema/elements/dato-input/datoInputUtils';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import DateValues from '../../validation/values';
import { er4ÅrSidenOppstartEllerMindre } from '../næringer';

const næringMock: Partial<Næring> = { tidsperiode: {} };

describe('næringUtils', () => {
    describe('er4ÅrSidenOppstartEllerMindre', () => {
        it('should return true if næring.tidsperiode.fom is equal to or less than 4 years ago', () => {
            næringMock.tidsperiode = {
                fom: createDatoInputVerdiFromDate(DateValues.date4YearsAgo.toDate()),
            };
            expect(er4ÅrSidenOppstartEllerMindre(næringMock)).toBe(true);
        });

        it('should return false if næring.tidsperiode.fom is more than 4 years ago', () => {
            næringMock.tidsperiode = {
                fom: createDatoInputVerdiFromDate(DateValues.dateMoreThan4YearsAgo.toDate()),
            };
            expect(er4ÅrSidenOppstartEllerMindre(næringMock)).toBe(false);
        });
    });
});
