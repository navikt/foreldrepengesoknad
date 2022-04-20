import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Næring, NæringPartial } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import DateValues from '../../validation/values';
import { er4ÅrSidenOppstartEllerMindre } from '../næringer';

const næringMock: NæringPartial = { tidsperiode: {} };

describe('næringUtils', () => {
    describe('er4ÅrSidenOppstartEllerMindre', () => {
        it('should return true if næring.tidsperiode.fom is equal to or less than 4 years ago', () => {
            næringMock.tidsperiode!.fom = dateToISOString(DateValues.date4YearsAgo.toDate());
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(true);
        });

        it('should return false if næring.tidsperiode.fom is more than 4 years ago', () => {
            næringMock.tidsperiode!.fom = dateToISOString(DateValues.dateMoreThan4YearsAgo.toDate());
            expect(er4ÅrSidenOppstartEllerMindre(næringMock as Næring)).toBe(false);
        });
    });
});
