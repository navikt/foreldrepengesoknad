import { Periode } from 'uttaksplan/types/Periode';
import { getPeriodeHullEllerPeriodeUtenUttak } from './uttaksplanbuilderUtils';

interface SlettPeriodeParams {
    perioder: Periode[];
    slettetPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
}

export const slettPeriode = ({
    perioder,
    slettetPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
}: SlettPeriodeParams): Periode[] => {
    const result: Periode[] = perioder.reduce((res, periode) => {
        if (periode.id === slettetPeriode.id) {
            res.push(
                ...getPeriodeHullEllerPeriodeUtenUttak(
                    slettetPeriode.tidsperiode,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon,
                    bareFarHarRett
                )
            );
            return res;
        }

        res.push(periode);
        return res;
    }, [] as Periode[]);

    return result;
};
