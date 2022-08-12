import { Periode } from 'uttaksplan/types/Periode';
import { getPeriodeHullEllerPeriodeUtenUttak } from './uttaksplanbuilderUtils';

interface SlettPeriodeParams {
    perioder: Periode[];
    slettetPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
}

export const slettPeriode = ({
    perioder,
    slettetPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
    erFarEllerMedmor,
}: SlettPeriodeParams): Periode[] => {
    const result: Periode[] = perioder.reduce((res, periode, index) => {
        if (index === 0 && periode.id === slettetPeriode.id) {
            return res;
        }

        if (periode.id === slettetPeriode.id) {
            res.push(
                ...getPeriodeHullEllerPeriodeUtenUttak(
                    slettetPeriode.tidsperiode,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon,
                    bareFarHarRett,
                    erFarEllerMedmor
                )
            );
            return res;
        }

        res.push(periode);
        return res;
    }, [] as Periode[]);

    return result;
};
