import { Periode } from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { slettPeriode } from './slettPeriode';
import { slåSammenLikePerioder } from './uttaksplanbuilderUtils';

interface OppdaterPeriodeParams {
    perioder: Periode[];
    endretPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
}

export const oppdaterPeriode = ({
    perioder,
    endretPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
}: OppdaterPeriodeParams): Periode[] => {
    const originalPeriode = perioder.find((p) => p.id === endretPeriode.id)!;

    const perioderSlettetEndretPeriode = slåSammenLikePerioder(
        slettPeriode({
            perioder,
            slettetPeriode: originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
        })
    );

    return leggTilPeriode({
        perioder: perioderSlettetEndretPeriode,
        nyPeriode: endretPeriode,
        familiehendelsesdato,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
    });
};
