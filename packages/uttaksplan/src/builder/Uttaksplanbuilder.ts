import { leggTilPeriode } from './leggTilPeriode';
import { oppdaterPeriode } from './oppdaterPeriode';
import { slettPeriode } from './slettPeriode';
import {
    finnOgSettInnHull,
    fjernUnødvendigeHull,
    settInnAnnenPartsUttak,
    slåSammenLikePerioder,
} from './uttaksplanbuilderUtils';
import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    isInfoPeriodeAnnenPart,
    isUtsettelsesperiode,
    starterUttaksperiodeFørFødsel,
} from '@navikt/fp-common';

const leggTilPeriodeOgBuild = (
    bevegeligePerioder: Periode[],
    fastePerioder: Periode[],
    nyPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    let nyePerioder = slåSammenLikePerioder(
        leggTilPeriode({
            perioder: bevegeligePerioder,
            nyPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        }),
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
    );

    fastePerioder.forEach((fastPeriode) => {
        nyePerioder = leggTilPeriode({
            perioder: nyePerioder,
            nyPeriode: fastPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        });
    });

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttak(nyePerioder, annenPartsUttak, familiehendelsesdato, førsteUttaksdagNesteBarnsSak),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
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
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    const originalPeriode = perioder.find((p) => p.id === endretPeriode.id)!;

    let oppdatertePerioder = fjernUnødvendigeHull(
        oppdaterPeriode({
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
        }),
    );

    if (annenPartsUttak) {
        oppdatertePerioder = finnOgSettInnHull(
            oppdatertePerioder,
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        );
        oppdatertePerioder = settInnAnnenPartsUttak(
            oppdatertePerioder,
            annenPartsUttak,
            familiehendelsesdato,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    return finnOgSettInnHull(
        oppdatertePerioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

const slettPeriodeOgBuild = (
    perioder: Periode[],
    slettetPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    let nyePerioder = fjernUnødvendigeHull(
        slåSammenLikePerioder(
            slettPeriode({
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            }),
            familiehendelsesdato,
            førsteUttaksdagNesteBarnsSak,
        ),
    );

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            nyePerioder,
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        );
        nyePerioder = settInnAnnenPartsUttak(
            nyePerioder,
            annenPartsUttak,
            familiehendelsesdato,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    return finnOgSettInnHull(
        nyePerioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

const getFastePerioder = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    return perioder.filter(
        (p) =>
            isUtsettelsesperiode(p) ||
            isForeldrepengerFørFødselUttaksperiode(p) ||
            starterUttaksperiodeFørFødsel(p, familiehendelsesdato),
    );
};

const getBevegeligePerioder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Periode[] => {
    return finnOgSettInnHull(
        perioder.filter(
            (p) =>
                !isUtsettelsesperiode(p) &&
                !isForeldrepengerFørFødselUttaksperiode(p) &&
                !starterUttaksperiodeFørFødsel(p, familiehendelsesdato) &&
                !isInfoPeriodeAnnenPart(p),
        ),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

const getAnnenPartsUttak = (perioder: Periode[]): Periode[] => {
    return perioder.filter((p) => isInfoPeriodeAnnenPart(p));
};

const Uttaksplanbuilder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    opprinneligPlan?: Periode[],
) => {
    const perioderUtenAnnenPart = finnOgSettInnHull(
        perioder.filter((p) => !isInfoPeriodeAnnenPart(p)),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    const fastePerioder = getFastePerioder(perioderUtenAnnenPart, familiehendelsesdato);
    const bevegeligePerioder = getBevegeligePerioder(
        perioderUtenAnnenPart,
        familiehendelsesdato,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    let annenPartsUttak: Periode[] | undefined = undefined;

    if (opprinneligPlan) {
        annenPartsUttak = getAnnenPartsUttak(opprinneligPlan);
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
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
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
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const nyAnnenPartsUttak = getAnnenPartsUttak(resultat);
                    const nyFastePerioder = getFastePerioder(resultat, familiehendelsesdato);
                    const nyBevegeligePerioder = getBevegeligePerioder(
                        resultat,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        periode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                }
            });
            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Periode) =>
            oppdaterPeriodeOgBuild(
                endretPeriode,
                perioderUtenAnnenPart,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
            ),
        oppdaterPerioder: (oppdatertePerioder: Periode[]) => {
            let resultat: Periode[] = [];
            oppdatertePerioder.forEach((endretPeriode, index) => {
                if (index === 0) {
                    resultat = oppdaterPeriodeOgBuild(
                        endretPeriode,
                        perioderUtenAnnenPart,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const nyAnnenPartsUttak = getAnnenPartsUttak(resultat);
                    const nyFastePerioder = getFastePerioder(resultat, familiehendelsesdato);
                    const nyBevegeligePerioder = getBevegeligePerioder(
                        resultat,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        endretPeriode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Periode) =>
            slettPeriodeOgBuild(
                perioderUtenAnnenPart,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
            ),
    };
};

export default Uttaksplanbuilder;
