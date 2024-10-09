import { Planperiode } from '../types/Planperiode';
import { leggTilPeriode } from './leggTilPeriode';
import { slettPeriode } from './slettPeriode';
import { slåSammenLikePerioder } from './uttaksplanbuilderUtils';

interface OppdaterPeriodeParams {
    perioder: Planperiode[];
    endretPeriode: Planperiode;
    originalPeriode: Planperiode;
    familiehendelsesdato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
    annenPartsUttak: Planperiode[] | undefined;
    førsteUttaksdagNesteBarnsSak: string | undefined;
}

export const oppdaterPeriode = ({
    perioder,
    endretPeriode,
    originalPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
    erFarEllerMedmor,
    annenPartsUttak,
    førsteUttaksdagNesteBarnsSak,
}: OppdaterPeriodeParams): Planperiode[] => {
    const perioderSlettetEndretPeriode = slåSammenLikePerioder(
        slettPeriode({
            perioder,
            slettetPeriode: originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        }),
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsUttak,
    );

    return slåSammenLikePerioder(
        leggTilPeriode({
            perioder: perioderSlettetEndretPeriode,
            nyPeriode: endretPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        }),
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsUttak,
    );
};
