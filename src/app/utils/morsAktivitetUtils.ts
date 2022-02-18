import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Skjemanummer } from 'app/types/Skjemanummer';
import dayjs from 'dayjs';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';

export const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean {
        const reglerFørFørsteOkt2021 = dayjs(new Date()).isBefore(new Date('2021-10-01'));
        const annenForelderErUfør = isAnnenForelderOppgitt(annenForelder) ? annenForelder.erUfør : undefined;
        const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
            ? annenForelder.harRettPåForeldrepenger
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
            return Skjemanummer.DOK_INNLEGGELSE;
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
        case MorsAktivitet.Introduksjonsprogrammet:
            return Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
        case MorsAktivitet.ArbeidOgUtdanning:
        case MorsAktivitet.Arbeid:
        case MorsAktivitet.TrengerHjelp:
            return Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;
        case MorsAktivitet.Utdanning:
            return Skjemanummer.BEKREFTELSE_FRA_STUDIESTED;
        default:
            return Skjemanummer.ANNET;
    }
};
