import { Periode } from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { slettPeriode } from './slettPeriode';
import { slåSammenLikePerioder } from './uttaksplanbuilderUtils';

interface OppdaterPeriodeParams {
    perioder: Periode[];
    endretPeriode: Periode;
    originalPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
}

export const oppdaterPeriode = ({
    perioder,
    endretPeriode,
    originalPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
}: OppdaterPeriodeParams): Periode[] => {
    const perioderSlettetEndretPeriode = slåSammenLikePerioder(
        slettPeriode({
            perioder,
            slettetPeriode: originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
        }),
        familiehendelsesdato
    );

    return slåSammenLikePerioder(
        leggTilPeriode({
            perioder: perioderSlettetEndretPeriode,
            nyPeriode: endretPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
        }),
        familiehendelsesdato
    );
};
