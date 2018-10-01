import {
    Periode,
    Periodetype,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';

export const cleanupPeriode = (periode: Periode): Periode => {
    if (periode.type === Periodetype.Overføring) {
        return {
            type: Periodetype.Overføring,
            id: periode.id,
            konto: periode.konto,
            vedlegg: periode.vedlegg,
            forelder: periode.forelder,
            tidsperiode: periode.tidsperiode,
            årsak: periode.årsak
        };
    }
    if (periode.type === Periodetype.Uttak) {
        const uttaksperiode: Partial<Periode> = {
            type: Periodetype.Uttak,
            id: periode.id,
            konto: periode.konto,
            vedlegg: periode.vedlegg,
            forelder: periode.forelder,
            tidsperiode: periode.tidsperiode,
            gradert: periode.gradert,
            morsAktivitetIPerioden: periode.morsAktivitetIPerioden,
            ønskerSamtidigUttak: periode.gradert === true ? periode.ønskerSamtidigUttak : undefined,
            stillingsprosent: periode.gradert === true ? periode.stillingsprosent : undefined,
            selvstendigNæringsdrivendeEllerFrilans:
                periode.gradert === true ? periode.selvstendigNæringsdrivendeEllerFrilans : undefined,
            orgnr: periode.gradert === true ? periode.orgnr : undefined
        };
        if (isForeldrepengerFørFødselUttaksperiode(periode)) {
            (uttaksperiode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin =
                periode.skalIkkeHaUttakFørTermin;
        }
        return uttaksperiode as Periode;
    }
    return periode;
};
