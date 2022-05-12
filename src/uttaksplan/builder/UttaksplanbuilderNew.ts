import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import {
    isHull,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUtsettelsesperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import { resetTidsperioder } from './uttaksplanbuilderUtils';

const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode, _fastePerioder: Periode[]): Periode[] => {
    const nyPeriodeFom = nyPeriode.tidsperiode.fom;
    const berørtPeriode = perioder.find((p) => Tidsperioden(p.tidsperiode).inneholderDato(nyPeriodeFom));

    if (berørtPeriode) {
        if (isUtsettelsesperiode(berørtPeriode)) {
            // Uttak som legges over utsettelse skal ikke tillates av validering. Ignore
            return [...perioder];
        }
    }

    return [...perioder, nyPeriode];
};

const oppdaterPeriode = () => null;

const slettPeriode = () => null;

const UttaksplanbuilderNew = (perioder: Periode[]) => {
    const fastePerioder = perioder.filter(
        (p) => isHull(p) || isPeriodeUtenUttak(p) || isPeriodeUtenUttakUtsettelse(p) || isUtsettelsesperiode(p)
    );
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter(
            (p) => !isHull(p) && !isPeriodeUtenUttak(p) && !isPeriodeUtenUttakUtsettelse(p) && !isUtsettelsesperiode(p)
        )
    );

    return {
        leggTilPeriode: (nyPeriode: Periode) => leggTilPeriode(bevegeligePerioder, nyPeriode, fastePerioder),
        oppdaterPeriode,
        slettPeriode,
    };
};

export default UttaksplanbuilderNew;
