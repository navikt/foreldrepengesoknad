import { Planperiode } from '../types/Planperiode';
import { getPeriodeHullEllerPeriodeUtenUttak } from './uttaksplanbuilderUtils';

interface SlettPeriodeParams {
    perioder: Planperiode[];
    slettetPeriode: Planperiode;
    familiehendelsesdato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
}

export const slettPeriode = ({
    perioder,
    slettetPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
    erFarEllerMedmor,
    førsteUttaksdagNesteBarnsSak,
}: SlettPeriodeParams): Planperiode[] => {
    const result: Planperiode[] = perioder.reduce((res, periode, index) => {
        if (index === 0 && periode.id === slettetPeriode.id) {
            return res;
        }

        if (periode.id === slettetPeriode.id) {
            const tidsperiode = { fom: slettetPeriode.fom, tom: slettetPeriode.tom };

            res.push(
                ...getPeriodeHullEllerPeriodeUtenUttak(
                    tidsperiode,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon,
                    bareFarHarRett,
                    erFarEllerMedmor,
                    førsteUttaksdagNesteBarnsSak,
                ),
            );
            return res;
        }

        res.push(periode);
        return res;
    }, [] as Planperiode[]);

    return result;
};
