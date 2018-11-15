import { Næring, NæringPartial } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { er4ÅrSidenOppstartEllerMindre, næringsinntektSisteÅrMåDokumenteres } from '../næringer';
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

    describe('næringsinntektSisteÅrMåDokumenteres', () => {
        it('should return true if næring.tidsperiode.fom is 1 year ago or less', () => {
            næringMock.tidsperiode!.fom = DateValues.date1YearAgo.toDate();
            expect(næringsinntektSisteÅrMåDokumenteres(næringMock as Næring)).toBe(true);
        });

        it('should return false if næring.tidsperiode.fom is more than 1 year ago', () => {
            næringMock.tidsperiode!.fom = DateValues.dateMoreThan1YearAgo.toDate();
            expect(næringsinntektSisteÅrMåDokumenteres(næringMock as Næring)).toBe(false);
        });
    });
});
