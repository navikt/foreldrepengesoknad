import dayjs from 'dayjs';
import { hasValue } from './validationUtils';
import { isAnnenForelderOppgitt, AnnenForelder, MorsAktivitet } from '../types';
import { Skjemanummer } from '@navikt/fp-constants';

export const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean {
        const reglerFørFørsteOkt2021 = dayjs(new Date()).isBefore(new Date('2021-10-01'), 'day');
        const annenForelderErUfør = isAnnenForelderOppgitt(annenForelder) ? annenForelder.erUfør : undefined;
        const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
            ? annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS
            : undefined;

        return !søkerErFarEllerMedmor ||
            (annenForelderHarRett === false && annenForelderErUfør === true && !reglerFørFørsteOkt2021)
            ? false
            : annenForelderHarRett === false;
    },
};

export const getMorsAktivitetSkjemanummer = (morsAktivitet?: MorsAktivitet): Skjemanummer => {
    switch (morsAktivitet) {
        case MorsAktivitet.Innlagt:
            return Skjemanummer.DOK_INNLEGGELSE_MOR;
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
        case MorsAktivitet.Introduksjonsprogrammet:
            return Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
        case MorsAktivitet.ArbeidOgUtdanning:
            return Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR;
        case MorsAktivitet.Arbeid:
            return Skjemanummer.DOK_ARBEID_MOR;
        case MorsAktivitet.TrengerHjelp:
            return Skjemanummer.DOK_SYKDOM_MOR;
        case MorsAktivitet.Utdanning:
            return Skjemanummer.DOK_UTDANNING_MOR;
        default:
            return Skjemanummer.ANNET;
    }
};

export const getMorsAktivitet = (
    aktivitetskravMorValue: string | undefined,
    erMorForSykValue: boolean | undefined,
): MorsAktivitet | undefined => {
    if (hasValue(aktivitetskravMorValue)) {
        return aktivitetskravMorValue as MorsAktivitet;
    }
    if (erMorForSykValue) {
        return MorsAktivitet.TrengerHjelp;
    }
    return undefined;
};
