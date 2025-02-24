import { Planperiode } from '../types/Planperiode';
import { isAnnenPartsPeriode } from '../utils/periodeUtils';
import { leggTilPeriode } from './leggTilPeriode';
import { oppdaterPeriode } from './oppdaterPeriode';
import { slettPeriode } from './slettPeriode';
import {
    finnOgSettInnHull,
    fjernUnødvendigeHull,
    settInnAnnenPartsUttak,
    slåSammenLikePerioder,
} from './uttaksplanbuilderUtils';

const leggTilPeriodeOgBuild = (
    perioder: Planperiode[],
    nyPeriode: Planperiode,
    familiehendelsesdato: string,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Planperiode[] | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    let nyePerioder = slåSammenLikePerioder(
        leggTilPeriode({
            perioder,
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

    if (annenPartsUttak) {
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

const oppdaterPeriodeOgBuild = (
    endretPeriode: Planperiode,
    perioder: Planperiode[],
    familiehendelsesdato: string,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Planperiode[] | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
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
    perioder: Planperiode[],
    slettetPeriode: Planperiode,
    familiehendelsesdato: string,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Planperiode[] | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
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

const getAnnenPartsUttak = (perioder: Planperiode[]): Planperiode[] => {
    return perioder.filter((p) => isAnnenPartsPeriode(p));
};

export const Uttaksplanbuilder = (
    perioder: Planperiode[],
    familiehendelsesdato: string,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
    opprinneligPlan?: Planperiode[],
) => {
    const perioderUtenAnnenPart = finnOgSettInnHull(
        perioder.filter((p) => !isAnnenPartsPeriode(p)),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    let annenPartsUttak: Planperiode[] | undefined = undefined;

    if (opprinneligPlan) {
        annenPartsUttak = getAnnenPartsUttak(opprinneligPlan);
    }

    return {
        leggTilPeriode: (nyPeriode: Planperiode) =>
            leggTilPeriodeOgBuild(
                perioder,
                nyPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
            ),
        leggTilPerioder: (nyePerioder: Planperiode[]) => {
            let resultat: Planperiode[] = [];
            nyePerioder.forEach((periode, index) => {
                if (index === 0) {
                    resultat = leggTilPeriodeOgBuild(
                        perioder,
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

                    resultat = leggTilPeriodeOgBuild(
                        perioder,
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
        oppdaterPeriode: (endretPeriode: Planperiode) =>
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
        oppdaterPerioder: (oppdatertePerioder: Planperiode[]) => {
            let resultat: Planperiode[] = [];
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
                    resultat = leggTilPeriodeOgBuild(
                        resultat,
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
        slettPeriode: (slettetPeriode: Planperiode) =>
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
        slettPerioder: (slettedePerioder: Planperiode[]) => {
            let resultat: Planperiode[] = [];
            slettedePerioder.forEach((slettetPeriode, index) => {
                if (index === 0) {
                    resultat = slettPeriodeOgBuild(
                        perioderUtenAnnenPart,
                        slettetPeriode,
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
                    resultat = slettPeriodeOgBuild(
                        resultat,
                        slettetPeriode,
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
    };
};
