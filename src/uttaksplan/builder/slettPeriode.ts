import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from 'app/utils/wlbUtils';
import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { getPeriodeHullEllerPeriodeUtenUttak } from './uttaksplanbuilderUtils';

interface SlettPeriodeParams {
    perioder: Periode[];
    slettetPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    erFarEllerMedmor: boolean;
    termindato: Date | undefined;
}

export const slettPeriode = ({
    perioder,
    slettetPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    erFarEllerMedmor,
    termindato,
}: SlettPeriodeParams): Periode[] => {
    const result: Periode[] = perioder.reduce((res, periode) => {
        if (periode.id === slettetPeriode.id) {
            const erFarMedmorsUttaksperiodeRundtFødsel =
                isUttaksperiode(slettetPeriode) &&
                erFarMedmorSinWLBTidsperiodeRundtFødsel(
                    slettetPeriode.tidsperiode,
                    familiehendelsesdato,
                    slettetPeriode.type,
                    slettetPeriode.konto,
                    erFarEllerMedmor,
                    termindato
                );

            if (!erFarMedmorsUttaksperiodeRundtFødsel) {
                res.push(
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        slettetPeriode.tidsperiode,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon
                    )
                );
            }
            return res;
        }

        res.push(periode);
        return res;
    }, [] as Periode[]);

    return result;
};
