import { isForeldrepengerFørFødselUttaksperiode, isUtsettelsesperiode, Periode } from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { resetTidsperioder } from './uttaksplanbuilderUtils';

const oppdaterPeriode = () => null;

const slettPeriode = () => null;

const UttaksplanbuilderNew = (perioder: Periode[]) => {
    const fastePerioder = perioder.filter((p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p));
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p))
    );

    return {
        leggTilPeriode: (nyPeriode: Periode) => {
            let result = leggTilPeriode(bevegeligePerioder, nyPeriode);

            fastePerioder.forEach((fp) => {
                result = leggTilPeriode(result, fp);
            });

            return result;
        },
        oppdaterPeriode,
        slettPeriode,
    };
};

export default UttaksplanbuilderNew;
