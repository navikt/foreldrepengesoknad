import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import {
    isForeldrepengerFørFødselUttaksperiode,
    isInfoPeriode,
    isUtsettelsesperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { oppdaterPeriode } from './oppdaterPeriode';
import { slettPeriode } from './slettPeriode';
import {
    fjernHullPåSlutten,
    resetTidsperioder,
    settInnAnnenPartsUttakOmNødvendig,
    slåSammenLikePerioder,
} from './uttaksplanbuilderUtils';

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

const oppdaterPeriodeOgBuild = (
    endretPeriode: Periode,
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    annenPartsUttak?: Periode[]
) => {
    const originalPeriode = perioder.find((p) => p.id === endretPeriode.id)!;

    let oppdatertePerioder = fjernHullPåSlutten(
        oppdaterPeriode({
            perioder,
            endretPeriode,
            originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
        })
    );

    const antallDagerOriginalt = Perioden(originalPeriode).getAntallUttaksdager();
    const antallDagerNyPeriode = Perioden(endretPeriode).getAntallUttaksdager();

    if (annenPartsUttak && antallDagerNyPeriode < antallDagerOriginalt) {
        oppdatertePerioder = settInnAnnenPartsUttakOmNødvendig(oppdatertePerioder, annenPartsUttak);
    }

    return oppdatertePerioder;
};

const slettPeriodeOgBuild = (
    perioder: Periode[],
    slettetPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    annenPartsUttak?: Periode[]
) => {
    let nyePerioder = fjernHullPåSlutten(
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

    if (annenPartsUttak) {
        nyePerioder = settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak);
    }

    return nyePerioder;
};

const UttaksplanbuilderNew = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    opprinneligPlan?: Periode[]
) => {
    const fastePerioder = perioder.filter((p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p));
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p))
    );
    let annenPartsUttak: Periode[] | undefined = undefined;

    if (opprinneligPlan) {
        annenPartsUttak = opprinneligPlan.filter((p) => isInfoPeriode(p));
    }

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
            oppdaterPeriodeOgBuild(
                endretPeriode,
                perioder,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                annenPartsUttak
            ),
        slettPeriode: (slettetPeriode: Periode) =>
            slettPeriodeOgBuild(
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                annenPartsUttak
            ),
    };
};

export default UttaksplanbuilderNew;
