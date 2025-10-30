import { AnnenForelder, MorsAktivitet, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { MorsAktivitet_fpoversikt } from '@navikt/fp-types';

const hasValue = (v: string | undefined | null) => v !== '' && v !== undefined && v !== null;

export const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean {
        const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
            ? annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS
            : undefined;

        return søkerErFarEllerMedmor && annenForelderHarRett === false;
    },
};

export const getMorsAktivitetSkjemanummer = (morsAktivitet?: MorsAktivitet_fpoversikt): Skjemanummer => {
    switch (morsAktivitet) {
        case 'INNLAGT':
            return Skjemanummer.DOK_INNLEGGELSE_MOR;
        case 'KVALPROG':
            return Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
        case 'INTROPROG':
            return Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
        case 'ARBEID_OG_UTDANNING':
            return Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR;
        case 'ARBEID':
            return Skjemanummer.DOK_ARBEID_MOR;
        case 'TRENGER_HJELP':
            return Skjemanummer.DOK_SYKDOM_MOR;
        case 'UTDANNING':
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
