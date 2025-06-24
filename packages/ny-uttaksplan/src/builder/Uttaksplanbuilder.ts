import { Forelder } from '@navikt/fp-constants';

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

const getAnnenPartPlanlegger = (nyPeriode: Planperiode) => {
    const forelder = nyPeriode.forelder;

    if (forelder === Forelder.farMedmor) {
        return Forelder.mor;
    }
    return Forelder.farMedmor;
};

const getAnnenPartsUttakPlanlegger = (
    erIPlanleggerModus: boolean,
    perioder: Planperiode[],
    annenPart: Forelder | undefined,
) => {
    if (erIPlanleggerModus && annenPart !== undefined) {
        return perioder.filter((p) => p.forelder === annenPart);
    }

    return undefined;
};

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
    erIPlanleggerModus: boolean,
) => {
    const annenPartPlanlegger = getAnnenPartPlanlegger(nyPeriode);

    let nyePerioder = slåSammenLikePerioder(
        leggTilPeriode({
            perioder: erIPlanleggerModus ? perioder.filter((p) => p.forelder !== annenPartPlanlegger) : perioder,
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
        const annenPartsUttakPlanlegger = getAnnenPartsUttakPlanlegger(
            erIPlanleggerModus,
            perioder,
            annenPartPlanlegger,
        );

        nyePerioder = settInnAnnenPartsUttak(
            nyePerioder,
            annenPartsUttakPlanlegger ?? annenPartsUttak,
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
    erIPlanleggerModus: boolean,
) => {
    const originalPeriode = perioder.find((p) => p.id === endretPeriode.id)!;
    const annenPartPlanlegger = getAnnenPartPlanlegger(endretPeriode);

    const annenPartsUttakPlanlegger = getAnnenPartsUttakPlanlegger(erIPlanleggerModus, perioder, annenPartPlanlegger);

    let oppdatertePerioder = fjernUnødvendigeHull(
        oppdaterPeriode({
            perioder: erIPlanleggerModus ? perioder.filter((p) => p.forelder !== annenPartPlanlegger) : perioder,
            endretPeriode,
            originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            annenPartsUttak: erIPlanleggerModus ? annenPartsUttakPlanlegger : annenPartsUttak,
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
            annenPartsUttakPlanlegger ?? annenPartsUttak,
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

interface UttaksplanbuilderProps {
    perioder: Planperiode[];
    familiehendelsedato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    gjelderAdopsjon: boolean;
    bareFarMedmorHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    opprinneligPlan?: Planperiode[];
    erIPlanleggerModus?: boolean;
}

export const Uttaksplanbuilder = ({
    perioder,
    familiehendelsedato,
    harAktivitetskravIPeriodeUtenUttak,
    gjelderAdopsjon,
    bareFarMedmorHarRett,
    erFarEllerMedmor,
    førsteUttaksdagNesteBarnsSak,
    opprinneligPlan,
    erIPlanleggerModus = false,
}: UttaksplanbuilderProps) => {
    const perioderUtenAnnenPart = finnOgSettInnHull(
        perioder.filter((p) => !isAnnenPartsPeriode(p)),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
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
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
                erIPlanleggerModus,
            ),
        leggTilPerioder: (nyePerioder: Planperiode[]) => {
            let resultat: Planperiode[] = [];
            nyePerioder.forEach((periode, index) => {
                if (index === 0) {
                    resultat = leggTilPeriodeOgBuild(
                        perioder,
                        periode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                        erIPlanleggerModus,
                    );
                } else {
                    const nyAnnenPartsUttak = getAnnenPartsUttak(resultat);

                    resultat = leggTilPeriodeOgBuild(
                        perioder,
                        periode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                        erIPlanleggerModus,
                    );
                }
            });
            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Planperiode) =>
            oppdaterPeriodeOgBuild(
                endretPeriode,
                perioderUtenAnnenPart,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                annenPartsUttak,
                førsteUttaksdagNesteBarnsSak,
                erIPlanleggerModus,
            ),
        oppdaterPerioder: (oppdatertePerioder: Planperiode[]) => {
            let resultat: Planperiode[] = [];
            oppdatertePerioder.forEach((endretPeriode, index) => {
                if (index === 0) {
                    resultat = oppdaterPeriodeOgBuild(
                        endretPeriode,
                        perioderUtenAnnenPart,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                        erIPlanleggerModus,
                    );
                } else {
                    const nyAnnenPartsUttak = getAnnenPartsUttak(resultat);
                    resultat = leggTilPeriodeOgBuild(
                        resultat,
                        endretPeriode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                        erIPlanleggerModus,
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Planperiode) =>
            slettPeriodeOgBuild(
                perioderUtenAnnenPart,
                slettetPeriode,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
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
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const nyAnnenPartsUttak = getAnnenPartsUttak(resultat);
                    resultat = slettPeriodeOgBuild(
                        resultat,
                        slettetPeriode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
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
