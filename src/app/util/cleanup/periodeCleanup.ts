import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';

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
        return {
            type: Periodetype.Uttak,
            id: periode.id,
            konto: periode.konto,
            vedlegg: periode.vedlegg,
            forelder: periode.forelder,
            tidsperiode: periode.tidsperiode,
            gradert: periode.gradert,
            morsAktivitetIPerioden: periode.morsAktivitetIPerioden,
            ønskerSamtidigUttak: periode.ønskerSamtidigUttak
        };
    }
    return periode;
};
