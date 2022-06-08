import { isForeldrepengerFørFødselUttaksperiode, isUtsettelsesperiode, Periode } from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { oppdaterPeriode } from './oppdaterPeriode';
import { slettPeriode } from './slettPeriode';
import { fjernHullPåSlutten, resetTidsperioder, slåSammenLikePerioder } from './uttaksplanbuilderUtils';

const leggTilPeriodeOgBuild = (
    bevegeligePerioder: Periode[],
    fastePerioder: Periode[],
    nyPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean
) => {
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
};

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
        leggTilPeriode: (nyPeriode: Periode) =>
            leggTilPeriodeOgBuild(
                bevegeligePerioder,
                fastePerioder,
                nyPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon
            ),
        oppdaterPeriode: (endretPeriode: Periode) =>
            oppdaterPeriode({
                perioder,
                endretPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
            }),
        slettPeriode: (slettetPeriode: Periode) => {
            return fjernHullPåSlutten(
                slåSammenLikePerioder(
                    slettPeriode({
                        perioder,
                        slettetPeriode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                    })
                )
            );
        },
    };
};

export default UttaksplanbuilderNew;
