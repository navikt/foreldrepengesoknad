import { getUtsettelseSkjemanummer } from '../utsettelseSkjemanummer';
import {
    MorsAktivitet,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from '../../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { Forelder } from 'common/types';
import DateValues from '../../validation/values';

const periodeMock: Utsettelsesperiode = {
    id: 'asdf',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.InstitusjonBarnet,
    forelder: Forelder.farMedmor,
    erArbeidstaker: false,
    tidsperiode: {
        fom: DateValues.today.toDate(),
        tom: DateValues.today.toDate(),
    },
};

describe('getUtsettelseSkjemanummer', () => {
    it('should require Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM if morsAktivitetIPerioden is truthy', () => {
        const periodeMedMorsAktivitet = { ...periodeMock, morsAktivitetIPerioden: MorsAktivitet.Utdanning };
        expect(getUtsettelseSkjemanummer(periodeMedMorsAktivitet)).toBe(Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM);
    });

    it('should require Skjemanummer.ANNET if neither morsAktivitetIPerioden nor erArbeidstaker is truthy', () => {
        expect(getUtsettelseSkjemanummer(periodeMock)).toBe(Skjemanummer.ANNET);
    });
});
