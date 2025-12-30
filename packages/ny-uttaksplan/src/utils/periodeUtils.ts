import dayjs from 'dayjs';
import isoWeekday from 'dayjs/plugin/isoWeek';
import { IntlShape } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    Tidsperiode,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import {
    TidsperiodenString,
    UttaksdagenString,
    capitalizeFirstLetter,
    isValidTidsperiodeString,
    slutterTidsperiodeInnen6UkerEtterFødsel,
} from '@navikt/fp-utils';

import { finnOgSettInnHull, settInnAnnenPartsUttak, slåSammenLikePerioder } from '../builder/uttaksplanbuilderUtils';
import { ForeldreInfo } from '../types/ForeldreInfo';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';

dayjs.extend(isoWeekday);

type UttakPeriode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export function sorterPerioder(p1: Planperiode | UttakPeriode, p2: Planperiode | UttakPeriode) {
    const tidsperiode1 = { fom: p1.fom, tom: p1.tom };
    const tidsperiode2 = { fom: p2.fom, tom: p2.tom };

    if (isValidTidsperiodeString(tidsperiode1) === false || isValidTidsperiodeString(tidsperiode2) === false) {
        return isValidTidsperiodeString(tidsperiode1) ? 1 : -1;
    }
    if (dayjs(tidsperiode1.fom).isSame(tidsperiode2.fom, 'day')) {
        return 1;
    }

    if (TidsperiodenString(tidsperiode2).erOmsluttetAv(tidsperiode1)) {
        return 1;
    }

    return dayjs(tidsperiode1.fom).isBefore(tidsperiode2.fom, 'day') ? -1 : 1;
}

export const isUttaksperiode = (periode: Planperiode | UttakPeriode) => {
    return periode.kontoType !== undefined && ('trekkdager' in periode || periode.utsettelseÅrsak === undefined);
};

export const isPrematuruker = (periode: Planperiode) => {
    return (
        periode.kontoType !== undefined &&
        !periode.erAnnenPartEøs &&
        periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

const isUttaksperiodeAnnenPart = (periode: Planperiode) => {
    return periode.kontoType !== undefined && (periode.erAnnenPartEøs || periode.utsettelseÅrsak === undefined);
};

export const isForeldrepengerFørFødselPeriode = (periode: Planperiode) => {
    return periode.kontoType !== undefined && periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL';
};

export const isUtsettelsesperiode = (periode: Planperiode) => {
    return (
        !periode.erAnnenPartEøs &&
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const isUtsettelsesperiodeAnnenPart = (periode: Planperiode) => {
    return !periode.erAnnenPartEøs && periode.utsettelseÅrsak !== undefined;
};

export const isAnnenPartsPeriode = (periode: Planperiode) => {
    return isUtsettelsesperiodeAnnenPart(periode) || isUttaksperiodeAnnenPart(periode);
};

export const isOverføringsperiode = (periode: Planperiode) => {
    return !periode.erAnnenPartEøs && periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Planperiode) => {
    return !periode.erAnnenPartEøs && periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Planperiode | UttakPeriode) => {
    return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
};

export const isHull = (periode: Planperiode) => {
    return periode.periodeHullÅrsak !== undefined && periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER;
};

export const isPeriodeUtenUttak = (periode: Planperiode) => {
    return periode.periodeHullÅrsak !== undefined && periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: UttakOppholdÅrsak_fpoversikt,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);

    if (erMor) {
        if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }

        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FELLESPERIODE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }
    if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    return intl.formatMessage(
        { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.MØDREKVOTE_ANNEN_FORELDER` },
        { foreldernavn: navn },
    );
};

export const finnTekstForUtsettelseÅrsak = (intl: IntlShape, utsettelseÅrsak: UttakUtsettelseÅrsak_fpoversikt) => {
    switch (utsettelseÅrsak) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ARBEID' });
        case 'LOVBESTEMT_FERIE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.LOVBESTEMT_FERIE' });
        case 'FRI':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.FRI' });
        case 'HV_ØVELSE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.HV_ØVELSE' });
        case 'BARN_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.BARN_INNLAGT' });
        case 'SØKER_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_INNLAGT' });
        case 'NAV_TILTAK':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.NAV_TILTAK' });
        case 'SØKER_SYKDOM':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_SYKDOM' });
    }
};

interface SplittetDatoType {
    dato: string;
    erFom: boolean;
}

const splittPeriodePåDatoer = (periode: Planperiode, alleDatoer: SplittetDatoType[]) => {
    const datoerIPerioden = alleDatoer.filter((datoWrapper) =>
        TidsperiodenString({ fom: periode.fom, tom: periode.tom }).inneholderDato(datoWrapper.dato),
    );
    const oppsplittetPeriode: Planperiode[] = [];

    if (datoerIPerioden.length === 2) {
        return [periode];
    }

    datoerIPerioden.forEach((datoWrapper, index) => {
        if (index === 0) {
            oppsplittetPeriode.push({
                ...periode,
                fom: datoWrapper.dato,
                tom: undefined!,
            });
            return;
        }

        const oppPeriode = oppsplittetPeriode[index - 1]!;
        oppPeriode.tom = datoWrapper.erFom ? UttaksdagenString(datoWrapper.dato).forrige() : datoWrapper.dato;
        oppPeriode.id = `${oppPeriode.fom} - ${oppPeriode.tom} - ${oppPeriode.kontoType || oppPeriode.periodeHullÅrsak || oppPeriode.utsettelseÅrsak}`;

        if (index < datoerIPerioden.length - 1) {
            const endretPeriode = {
                ...periode,
                fom: datoWrapper.erFom ? datoWrapper.dato : UttaksdagenString(datoWrapper.dato).neste(),
                tom: undefined!,
            };

            if (endretPeriode.erAnnenPartEøs) {
                oppsplittetPeriode.push({ ...endretPeriode, trekkdager: 0 });
            } else {
                oppsplittetPeriode.push(endretPeriode);
            }
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiodeString({ fom: p.fom, tom: p.tom }));
};

export const normaliserPerioder = (søkersPerioder: Planperiode[], annenPartsPerioder: Planperiode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = søkersPerioder.reduce<SplittetDatoType[]>((res, p) => {
        res.push({ dato: p.fom, erFom: true }, { dato: p.tom, erFom: false });
        return res;
    }, []);
    const annenPartsUttakTidsperioder = annenPartsPerioder.reduce<SplittetDatoType[]>((res, p) => {
        res.push({ dato: p.fom, erFom: true }, { dato: p.tom, erFom: false });
        return res;
    }, []);

    const alleDatoer = perioderTidsperioder.concat(annenPartsUttakTidsperioder).sort((d1, d2) => {
        if (new Date(d1.dato).getTime() - new Date(d2.dato).getTime() === 0) {
            if (!d1.erFom) {
                return 1;
            }

            if (!d2.erFom) {
                return -1;
            }
        }
        return new Date(d1.dato).getTime() - new Date(d2.dato).getTime();
    });

    const alleUnikeDatoer = alleDatoer.reduce<SplittetDatoType[]>((result, datoWrapper) => {
        if (!result.some((d) => d.dato === datoWrapper.dato && d.erFom === datoWrapper.erFom)) {
            result.push(datoWrapper);
        }
        return result;
    }, []);
    const normaliserteEgnePerioder: Planperiode[] = [];
    const normaliserteAnnenPartsPerioder: Planperiode[] = [];

    for (const p of søkersPerioder) {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleUnikeDatoer);
        normaliserteEgnePerioder.push(...oppsplittetPeriode);
    }

    for (const p of annenPartsPerioder) {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleUnikeDatoer);
        normaliserteAnnenPartsPerioder.push(...oppsplittetPeriode);
    }

    return {
        normaliserteEgnePerioder,
        normaliserteAnnenPartsPerioder,
    };
};

export const getTidsperiodeFromPlanperiode = (periode: Planperiode): Tidsperiode => {
    return {
        fom: periode.fom,
        tom: periode.tom,
    };
};

export const genererPeriodeId = (
    fom: string,
    tom: string,
    kontoType: any,
    utsettelseÅrsak: UttakUtsettelseÅrsak_fpoversikt | undefined,
    oppholdårsak: UttakOppholdÅrsak_fpoversikt | undefined,
    erFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
) => {
    const forelder = getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, oppholdårsak);

    return `${fom} - ${tom} - ${kontoType || oppholdårsak || utsettelseÅrsak} - ${forelder}`;
};

export const mapSaksperiodeTilPlanperiode = (
    saksperioder: UttakPeriode[],
    gjelderAnnenPart: boolean,
    familiehendelsedato: string,
    erSøkerMor: boolean,
) => {
    const result: Planperiode[] = [];

    const saksperioderUtenAvslåttePerioder = saksperioder.filter((p) => {
        if (!('trekkdager' in p) && p.resultat) {
            if (p.resultat.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
                return true;
            }

            return p.resultat.innvilget;
        }

        return true;
    });

    for (const p of saksperioderUtenAvslåttePerioder) {
        const tidsperiodenKrysserFamdato =
            dayjs(p.fom).isBefore(familiehendelsedato) && dayjs(p.tom).isAfter(familiehendelsedato);

        const oppholdårsak = 'oppholdÅrsak' in p ? p.oppholdÅrsak : undefined;
        const utsettelseårsak = 'utsettelseÅrsak' in p ? p.utsettelseÅrsak : undefined;
        const forelder = getForelderForPeriode(!erSøkerMor, gjelderAnnenPart, oppholdårsak);

        if (tidsperiodenKrysserFamdato) {
            const planperiodeFør: Planperiode = {
                ...p,
                erAnnenPartEøs: false,
                fom: p.fom,
                tom: UttaksdagenString(familiehendelsedato).forrige(),
                id: genererPeriodeId(
                    p.fom,
                    UttaksdagenString(familiehendelsedato).forrige(),
                    p.kontoType,
                    utsettelseårsak,
                    oppholdårsak,
                    !erSøkerMor,
                    gjelderAnnenPart,
                ),
                forelder,
            };

            const planperiodeEtter: Planperiode = {
                ...p,
                erAnnenPartEøs: false,
                fom: UttaksdagenString(familiehendelsedato).denneEllerNeste(),
                tom: p.tom,
                id: genererPeriodeId(
                    UttaksdagenString(familiehendelsedato).denneEllerNeste(),
                    p.tom,
                    p.kontoType,
                    utsettelseårsak,
                    oppholdårsak,
                    !erSøkerMor,
                    gjelderAnnenPart,
                ),
                forelder,
            };

            result.push(planperiodeFør, planperiodeEtter);
        } else {
            const planperiode: Planperiode = {
                ...p,
                erAnnenPartEøs: false,
                id: genererPeriodeId(
                    p.fom,
                    p.tom,
                    p.kontoType,
                    utsettelseårsak,
                    oppholdårsak,
                    !erSøkerMor,
                    gjelderAnnenPart,
                ),
                forelder,
            };

            result.push(planperiode);
        }
    }

    return result;
};

export const getForelderForPeriode = (
    søkerErFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
    oppholdsårsak: UttakOppholdÅrsak_fpoversikt | undefined,
): BrukerRolleSak_fpoversikt => {
    if (oppholdsårsak || gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? 'MOR' : 'FAR_MEDMOR';
    }

    return søkerErFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';
};

export const isAvslåttPeriodeFørsteSeksUkerMor = (periode: UttakPeriode, familiehendelsesdato: string): boolean => {
    return (
        !!isAvslåttPeriode(periode) &&
        'forelder' in periode &&
        periode.forelder === 'MOR' &&
        dayjs(periode.fom).isSameOrAfter(dayjs(familiehendelsesdato), 'day') &&
        slutterTidsperiodeInnen6UkerEtterFødsel({ fom: periode.fom, tom: periode.tom }, new Date(familiehendelsesdato))
    );
};

export const getIndexOfSistePeriodeFørDato = (uttaksplan: UttakPeriode[] | Planperiode[], dato: string | undefined) => {
    if (dato !== undefined) {
        return Math.max(0, uttaksplan.filter((p) => dayjs(p.tom).isBefore(dato, 'day')).length);
    }
    return undefined;
};
export const getAnnenForelderSamtidigUttakPeriode = (
    periode: UttakPeriode,
    perioder: UttakPeriode[],
): UttakPeriode | undefined => {
    if (isUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter(
                (p) =>
                    'forelder' in p &&
                    'forelder' in periode &&
                    p.forelder !== periode.forelder &&
                    isUttaksperiode(periode),
            )
            .find((p) => dayjs(periode.fom).isSame(p.fom));

        return samtidigUttak;
    }

    return undefined;
};

type UtledKomplettPlanParams = {
    familiehendelsedato: string;
    foreldreInfo: ForeldreInfo;
    søkersPerioder: UttakPeriode_fpoversikt[];
    annenPartsPerioder?: UttakPeriode[];
    gjelderAdopsjon: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
};
export const utledKomplettPlan = ({
    familiehendelsedato,
    foreldreInfo,
    søkersPerioder,
    annenPartsPerioder,
    gjelderAdopsjon,
    harAktivitetskravIPeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak,
}: UtledKomplettPlanParams) => {
    const erSøkerMor = foreldreInfo.søker === 'MOR';
    const søkersPlanperioder = finnOgSettInnHull(
        mapSaksperiodeTilPlanperiode(søkersPerioder, false, familiehendelsedato, erSøkerMor),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        foreldreInfo.rettighetType === 'BARE_SØKER_RETT',
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
        førsteUttaksdagNesteBarnsSak,
    );
    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, true, familiehendelsedato, erSøkerMor)
        : undefined;

    const planMedLikePerioderSlåttSammen = slåSammenLikePerioder(
        søkersPlanperioder,
        familiehendelsedato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );

    return finnOgSettInnHull(
        annenPartsPlanperioder
            ? settInnAnnenPartsUttak(
                  søkersPlanperioder,
                  annenPartsPlanperioder,
                  familiehendelsedato,
                  førsteUttaksdagNesteBarnsSak,
                  true,
              )
            : planMedLikePerioderSlåttSammen,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        foreldreInfo.rettighetType === 'BARE_SØKER_RETT',
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
        førsteUttaksdagNesteBarnsSak,
    );
};
