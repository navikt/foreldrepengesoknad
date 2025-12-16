import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { Planperiode } from '../types/Planperiode';
import { genererPeriodeId, isAnnenPartsPeriode } from '../utils/periodeUtils';
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
    const perioderMedHull = finnOgSettInnHull(
        perioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );

    let nyePerioder = slåSammenLikePerioder(
        leggTilPeriode({
            perioder: perioderMedHull,
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
    const originalPeriode = perioder.find((p) => genererPeriodeId(p) === genererPeriodeId(endretPeriode));

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

const getAnnenPart = (forelder: BrukerRolleSak_fpoversikt | undefined) => {
    if (forelder) {
        return forelder === 'MOR' ? 'FAR_MEDMOR' : 'MOR';
    }

    return undefined;
};

interface GetPerioderPåForelderParams {
    perioder: Planperiode[];
    forelder: BrukerRolleSak_fpoversikt | undefined;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    familiehendelsedato: string;
    gjelderAdopsjon: boolean;
    bareFarMedmorHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak?: string;
    erAnnenPart: boolean;
}

const getPerioderPåForelder = ({
    perioder,
    forelder,
    harAktivitetskravIPeriodeUtenUttak,
    familiehendelsedato,
    gjelderAdopsjon,
    bareFarMedmorHarRett,
    erFarEllerMedmor,
    førsteUttaksdagNesteBarnsSak,
    erAnnenPart,
}: GetPerioderPåForelderParams) => {
    if (!forelder) {
        if (erAnnenPart) {
            return undefined;
        }

        return perioder;
    }

    if (erAnnenPart) {
        return perioder.filter((p) => p.erAnnenPartEøs || p.forelder === forelder);
    }

    return finnOgSettInnHull(
        perioder.filter((p) => !p.erAnnenPartEøs && p.forelder === forelder),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

type GetPerioderParams = Omit<GetPerioderPåForelderParams, 'forelder' | 'erAnnenPart'>;

const getAnnenPartsUttak = (perioder: Planperiode[] | undefined) => {
    if (!perioder || perioder.length === 0) {
        return undefined;
    }

    return perioder.filter((p) => isAnnenPartsPeriode(p));
};

const getSøkersPerioder = ({
    perioder,
    harAktivitetskravIPeriodeUtenUttak,
    familiehendelsedato,
    gjelderAdopsjon,
    bareFarMedmorHarRett,
    erFarEllerMedmor,
    førsteUttaksdagNesteBarnsSak,
}: GetPerioderParams) => {
    return finnOgSettInnHull(
        perioder.filter((p) => !isAnnenPartsPeriode(p)),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

interface SøkerOgAnnenpartsPerioder {
    søkersPerioder: Planperiode[];
    annenpartsPerioder: Planperiode[] | undefined;
}

interface GetSøkerOgAnnenpartsPerioderParams extends Omit<GetPerioderPåForelderParams, 'forelder' | 'erAnnenPart'> {
    erIPlanleggerModus: boolean;
    periode: Planperiode;
    opprinneligPlan: Planperiode[] | undefined;
}

const getSøkerOgAnnenpartsPerioder = ({
    periode,
    erIPlanleggerModus,
    opprinneligPlan,
    ...commonGetPerioderProps
}: GetSøkerOgAnnenpartsPerioderParams): SøkerOgAnnenpartsPerioder => {
    const forelder = periode.erAnnenPartEøs ? undefined : periode.forelder;
    const annenPart = getAnnenPart(forelder);
    const egnePerioder = erIPlanleggerModus
        ? getPerioderPåForelder({
              ...commonGetPerioderProps,
              forelder,
              erAnnenPart: false,
          })
        : getSøkersPerioder({
              ...commonGetPerioderProps,
          });
    const annenpartsPerioder = erIPlanleggerModus
        ? getPerioderPåForelder({
              ...commonGetPerioderProps,
              forelder: annenPart,
              erAnnenPart: true,
          })
        : getAnnenPartsUttak(opprinneligPlan);

    return {
        søkersPerioder: egnePerioder ?? [],
        annenpartsPerioder: annenpartsPerioder,
    };
};

interface UttaksplanbuilderParams {
    perioder: Planperiode[];
    familiehendelsedato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    gjelderAdopsjon: boolean;
    bareFarMedmorHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    opprinneligPlan?: Planperiode[];
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
}: UttaksplanbuilderParams) => {
    const commonGetPerioderProps = {
        perioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    };

    return {
        leggTilPeriode: (nyPeriode: Planperiode) => {
            const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder({
                ...commonGetPerioderProps,
                erIPlanleggerModus,
                opprinneligPlan,
                periode: nyPeriode,
            });

            return leggTilPeriodeOgBuild(
                søkersPerioder,
                nyPeriode,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        leggTilPerioder: (nyePerioder: Planperiode[]) => {
            if (nyePerioder.length === 0) {
                return perioder;
            }

            const { søkersPerioder: initialSøkersPerioder, annenpartsPerioder: initialAnnenpartsPerioder } =
                getSøkerOgAnnenpartsPerioder({
                    ...commonGetPerioderProps,
                    erIPlanleggerModus,
                    opprinneligPlan,
                    periode: nyePerioder[0]!,
                });

            let resultat: Planperiode[] = initialSøkersPerioder;
            let currentAnnenpartsPerioder = initialAnnenpartsPerioder;

            nyePerioder.forEach((periode, index) => {
                if (index > 0) {
                    // Oppdater annenpartsPerioder basert på forrige resultat
                    const annenPart = getAnnenPart(periode.erAnnenPartEøs ? undefined : periode.forelder);
                    currentAnnenpartsPerioder = erIPlanleggerModus
                        ? getPerioderPåForelder({
                              ...commonGetPerioderProps,
                              perioder: resultat,
                              forelder: annenPart,
                              erAnnenPart: true,
                          })
                        : getAnnenPartsUttak(opprinneligPlan);

                    // Filtrer bort annenparts perioder fra resultat for neste iterasjon
                    resultat = resultat.filter(
                        (p) => (!p.erAnnenPartEøs && p.forelder !== annenPart) || p.erAnnenPartEøs,
                    );
                }

                resultat = leggTilPeriodeOgBuild(
                    resultat,
                    periode,
                    familiehendelsedato,
                    harAktivitetskravIPeriodeUtenUttak,
                    gjelderAdopsjon,
                    bareFarMedmorHarRett,
                    erFarEllerMedmor,
                    currentAnnenpartsPerioder,
                    førsteUttaksdagNesteBarnsSak,
                );
            });

            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Planperiode) => {
            const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder({
                ...commonGetPerioderProps,
                erIPlanleggerModus,
                opprinneligPlan,
                periode: endretPeriode,
            });

            return oppdaterPeriodeOgBuild(
                endretPeriode,
                søkersPerioder,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        oppdaterPerioder: (oppdatertePerioder: Planperiode[]) => {
            const annenPart = getAnnenPart(
                oppdatertePerioder[0]!.erAnnenPartEøs ? undefined : oppdatertePerioder[0]!.forelder,
            );
            const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder({
                ...commonGetPerioderProps,
                erIPlanleggerModus,
                opprinneligPlan,
                periode: oppdatertePerioder[0]!,
            });

            let resultat: Planperiode[] = [];
            oppdatertePerioder.forEach((endretPeriode, index) => {
                if (index === 0) {
                    resultat = oppdaterPeriodeOgBuild(
                        endretPeriode,
                        søkersPerioder,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        annenpartsPerioder,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const nyAnnenPartsUttak = erIPlanleggerModus
                        ? getPerioderPåForelder({
                              ...commonGetPerioderProps,
                              forelder: annenPart,
                              erAnnenPart: true,
                          })
                        : getAnnenPartsUttak(opprinneligPlan);

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
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Planperiode) => {
            const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder({
                ...commonGetPerioderProps,
                erIPlanleggerModus,
                opprinneligPlan,
                periode: slettetPeriode,
            });

            return slettPeriodeOgBuild(
                søkersPerioder,
                slettetPeriode,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        slettPerioder: (slettedePerioder: Planperiode[]) => {
            const annenPart = getAnnenPart(
                slettedePerioder[0]!.erAnnenPartEøs ? undefined : slettedePerioder[0]!.forelder,
            );
            const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder({
                ...commonGetPerioderProps,
                erIPlanleggerModus,
                opprinneligPlan,
                periode: slettedePerioder[0]!,
            });

            let resultat: Planperiode[] = [];
            slettedePerioder.forEach((slettetPeriode, index) => {
                if (index === 0) {
                    resultat = slettPeriodeOgBuild(
                        søkersPerioder,
                        slettetPeriode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        erFarEllerMedmor,
                        annenpartsPerioder,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const nyAnnenPartsUttak = erIPlanleggerModus
                        ? getPerioderPåForelder({
                              ...commonGetPerioderProps,
                              forelder: annenPart,
                              erAnnenPart: true,
                          })
                        : getAnnenPartsUttak(opprinneligPlan);
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
