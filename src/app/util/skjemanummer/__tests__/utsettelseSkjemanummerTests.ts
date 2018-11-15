import { getUtsettelseSkjemanummer } from '../utsettelseSkjemanummer';
import {
    MorsAktivitet,
    Periodetype,
    StønadskontoType,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { Forelder } from 'common/types';
import DateValues from '../../validation/values';

const periodeMock: Utsettelsesperiode = {
    id: 'asdf',
    type: Periodetype.Utsettelse,
    konto: StønadskontoType.ForeldrepengerFørFødsel,
    årsak: UtsettelseÅrsakType.InstitusjonBarnet,
    forelder: Forelder.FARMEDMOR,
    erArbeidstaker: false,
    tidsperiode: {
        fom: DateValues.today.toDate(),
        tom: DateValues.today.toDate()
    }
};

describe('getUtsettelseSkjemanummer', () => {
    it('should require Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM if morsAktivitetIPerioden is truthy', () => {
        const periodeMedMorsAktivitet = { ...periodeMock, morsAktivitetIPerioden: MorsAktivitet.Utdanning };
        expect(getUtsettelseSkjemanummer(periodeMedMorsAktivitet)).toBe(Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM);
    });

    it('should require Skjemanummer.BEKREFTELSE_FRA_ARBEIDSGIVER if erArbeidstaker is truthy', () => {
        const arbeidstakerPeriode = { ...periodeMock, erArbeidstaker: true };
        expect(getUtsettelseSkjemanummer(arbeidstakerPeriode)).toBe(Skjemanummer.BEKREFTELSE_FRA_ARBEIDSGIVER);
    });

    it('should require Skjemanummer.ANNET if neither morsAktivitetIPerioden nor erArbeidstaker is truthy', () => {
        expect(getUtsettelseSkjemanummer(periodeMock)).toBe(Skjemanummer.ANNET);
    });
});
