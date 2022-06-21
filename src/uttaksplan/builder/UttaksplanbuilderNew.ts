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
    finnOgSettInnHull,
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
    erAdopsjon: boolean,
    bareFarHarRett: boolean
) => {
    let result = leggTilPeriode({
        perioder: bevegeligePerioder,
        nyPeriode,
        familiehendelsesdato,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        bareFarHarRett,
    });

    fastePerioder.forEach((fastPeriode) => {
        result = leggTilPeriode({
            perioder: result,
            nyPeriode: fastPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
        });
    });

    return slåSammenLikePerioder(result, familiehendelsesdato);
};

const oppdaterPeriodeOgBuild = (
    endretPeriode: Periode,
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
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
            bareFarHarRett,
        })
    );

    const antallDagerOriginalt = Perioden(originalPeriode).getAntallUttaksdager();
    const antallDagerNyPeriode = Perioden(endretPeriode).getAntallUttaksdager();

    if (annenPartsUttak && antallDagerNyPeriode < antallDagerOriginalt) {
        oppdatertePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(oppdatertePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett
        );
    }

    return oppdatertePerioder;
};

const slettPeriodeOgBuild = (
    perioder: Periode[],
    slettetPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
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
                bareFarHarRett,
            }),
            familiehendelsesdato
        )
    );

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett
        );
    }

    return nyePerioder;
};

const UttaksplanbuilderNew = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    opprinneligPlan?: Periode[]
) => {
    const fastePerioder = perioder.filter((p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p));
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)),
        familiehendelsesdato
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
                erAdopsjon,
                bareFarHarRett
            ),
        leggTilPerioder: (nyePerioder: Periode[]) => {
            let resultat: Periode[] = [];
            nyePerioder.forEach((periode, index) => {
                if (index === 0) {
                    resultat = leggTilPeriodeOgBuild(
                        bevegeligePerioder,
                        fastePerioder,
                        periode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett
                    );
                } else {
                    const nyFastePerioder = resultat.filter(
                        (p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p)
                    );
                    const nyBevegeligePerioder = resetTidsperioder(
                        resultat.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)),
                        familiehendelsesdato
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        periode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett
                    );
                }
            });
            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Periode) =>
            oppdaterPeriodeOgBuild(
                endretPeriode,
                perioder,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                annenPartsUttak
            ),
        oppdaterPerioder: (oppdatertePerioder: Periode[]) => {
            let resultat: Periode[] = [];
            oppdatertePerioder.forEach((endretPeriode, index) => {
                if (index === 0) {
                    resultat = oppdaterPeriodeOgBuild(
                        endretPeriode,
                        perioder,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett
                    );
                } else {
                    const nyFastePerioder = resultat.filter(
                        (p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p)
                    );
                    const nyBevegeligePerioder = resetTidsperioder(
                        resultat.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)),
                        familiehendelsesdato
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        endretPeriode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Periode) =>
            slettPeriodeOgBuild(
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                annenPartsUttak
            ),
    };
};

export default UttaksplanbuilderNew;
