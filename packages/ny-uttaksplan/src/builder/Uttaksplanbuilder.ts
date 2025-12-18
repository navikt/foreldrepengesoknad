import { ForeldreInfo } from '../types/ForeldreInfo';
import { Planperiode } from '../types/Planperiode';
import { getAnnenpartsPlanperioder, getSøkersPlanperioder } from '../utils/periodeUtils';
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

interface SøkerOgAnnenpartsPerioder {
    søkersPerioder: Planperiode[];
    annenpartsPerioder: Planperiode[] | undefined;
}

const getSøkerOgAnnenpartsPerioder = (
    foreldreInfo: ForeldreInfo,
    perioder: Planperiode[],
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsedato: string,
    gjelderAdopsjon: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
): SøkerOgAnnenpartsPerioder => {
    const egnePerioder = getSøkersPlanperioder(perioder, foreldreInfo);
    const annenpartsPerioder = getAnnenpartsPlanperioder(perioder, foreldreInfo);

    const søkerP = finnOgSettInnHull(
        egnePerioder ?? [],
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        foreldreInfo.rettighetType === 'BARE_SØKER_RETT',
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
        førsteUttaksdagNesteBarnsSak,
    );
    const annenP = finnOgSettInnHull(
        annenpartsPerioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        foreldreInfo.rettighetType === 'BARE_SØKER_RETT',
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
        førsteUttaksdagNesteBarnsSak,
    );

    return {
        søkersPerioder: søkerP,
        annenpartsPerioder: annenP,
    };
};

interface UttaksplanbuilderParams {
    perioder: Planperiode[];
    familiehendelsedato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    gjelderAdopsjon: boolean;
    foreldreInfo: ForeldreInfo;
    førsteUttaksdagNesteBarnsSak: string | undefined;
}

export const Uttaksplanbuilder = ({
    perioder,
    familiehendelsedato,
    harAktivitetskravIPeriodeUtenUttak,
    gjelderAdopsjon,
    foreldreInfo,
    førsteUttaksdagNesteBarnsSak,
}: UttaksplanbuilderParams) => {
    const { søkersPerioder, annenpartsPerioder } = getSøkerOgAnnenpartsPerioder(
        foreldreInfo,
        perioder,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        førsteUttaksdagNesteBarnsSak,
    );

    const bareFarMedmorHarRett =
        foreldreInfo.rettighetType === 'BARE_SØKER_RETT' && foreldreInfo.søker === 'FAR_ELLER_MEDMOR';

    return {
        leggTilPeriode: (nyPeriode: Planperiode) => {
            return leggTilPeriodeOgBuild(
                søkersPerioder,
                nyPeriode,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        leggTilPerioder: (nyePerioder: Planperiode[]) => {
            if (nyePerioder.length === 0) {
                return perioder;
            }

            let resultat: Planperiode[] = perioder;

            nyePerioder.forEach((periode, index) => {
                if (index > 0) {
                    const { annenpartsPerioder: ap } = getSøkerOgAnnenpartsPerioder(
                        foreldreInfo,
                        perioder,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsedato,
                        gjelderAdopsjon,
                        førsteUttaksdagNesteBarnsSak,
                    );
                    resultat = leggTilPeriodeOgBuild(
                        resultat,
                        periode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                        ap,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    resultat = leggTilPeriodeOgBuild(
                        søkersPerioder,
                        periode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                        annenpartsPerioder,
                        førsteUttaksdagNesteBarnsSak,
                    );
                }
            });

            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Planperiode) => {
            return oppdaterPeriodeOgBuild(
                endretPeriode,
                søkersPerioder,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        oppdaterPerioder: (oppdatertePerioder: Planperiode[]) => {
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
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                        annenpartsPerioder,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const { annenpartsPerioder: nyAnnenPartsUttak } = getSøkerOgAnnenpartsPerioder(
                        foreldreInfo,
                        perioder,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsedato,
                        gjelderAdopsjon,
                        førsteUttaksdagNesteBarnsSak,
                    );

                    resultat = leggTilPeriodeOgBuild(
                        resultat,
                        endretPeriode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',

                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Planperiode) => {
            return slettPeriodeOgBuild(
                søkersPerioder,
                slettetPeriode,
                familiehendelsedato,
                harAktivitetskravIPeriodeUtenUttak,
                gjelderAdopsjon,
                bareFarMedmorHarRett,
                foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                annenpartsPerioder,
                førsteUttaksdagNesteBarnsSak,
            );
        },
        slettPerioder: (slettedePerioder: Planperiode[]) => {
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
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                        annenpartsPerioder,
                        førsteUttaksdagNesteBarnsSak,
                    );
                } else {
                    const { annenpartsPerioder: nyAnnenPartsUttak } = getSøkerOgAnnenpartsPerioder(
                        foreldreInfo,
                        perioder,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsedato,
                        gjelderAdopsjon,
                        førsteUttaksdagNesteBarnsSak,
                    );
                    resultat = slettPeriodeOgBuild(
                        resultat,
                        slettetPeriode,
                        familiehendelsedato,
                        harAktivitetskravIPeriodeUtenUttak,
                        gjelderAdopsjon,
                        bareFarMedmorHarRett,
                        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
                        nyAnnenPartsUttak,
                        førsteUttaksdagNesteBarnsSak,
                    );
                }
            });

            return resultat;
        },
    };
};
