import { isForeldrepengerFørFødselUttaksperiode, isUtsettelsesperiode, Periode } from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { resetTidsperioder, slåSammenLikePerioder } from './uttaksplanbuilderUtils';

const oppdaterPeriode = () => null;

const slettPeriode = () => null;

const UttaksplanbuilderNew = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean
) => {
    const fastePerioder = perioder.filter((p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p));
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p))
    );

    return {
        leggTilPeriode: (nyPeriode: Periode) => {
            let result = leggTilPeriode({
                perioder: bevegeligePerioder,
                nyPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
            });

            fastePerioder.forEach((fastPeriode) => {
                result = leggTilPeriode({
                    perioder: result,
                    nyPeriode: fastPeriode,
                    familiehendelsesdato,
                    harAktivitetskravIPeriodeUtenUttak,
                    erAdopsjon,
                });
            });

            return slåSammenLikePerioder(result);
        },
        oppdaterPeriode,
        slettPeriode,
    };
};

export default UttaksplanbuilderNew;
