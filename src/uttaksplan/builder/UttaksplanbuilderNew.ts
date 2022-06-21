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
    annenPartsUttak: Periode[] | undefined
) => {
    let nyePerioder = leggTilPeriode({
        perioder: bevegeligePerioder,
        nyPeriode,
        familiehendelsesdato,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
    });

    fastePerioder.forEach((fastPeriode) => {
        nyePerioder = leggTilPeriode({
            perioder: nyePerioder,
            nyPeriode: fastPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
        });
    });

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon
        );
    }

    return nyePerioder;
};

const oppdaterPeriodeOgBuild = (
    endretPeriode: Periode,
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    annenPartsUttak: Periode[] | undefined
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

    if (annenPartsUttak) {
        oppdatertePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(oppdatertePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon
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
    annenPartsUttak: Periode[] | undefined
) => {
    let nyePerioder = fjernHullPåSlutten(
        slåSammenLikePerioder(
            slettPeriode({
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
            }),
            familiehendelsesdato
        )
    );

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon
        );
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
                annenPartsUttak
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
                        annenPartsUttak
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
                        annenPartsUttak
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
                        annenPartsUttak
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
                        annenPartsUttak
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
                annenPartsUttak
            ),
    };
};

export default UttaksplanbuilderNew;
