import dayjs from 'dayjs';
import isoWeekday from 'dayjs/plugin/isoWeek';
import { IntlShape } from 'react-intl';

import { Forelder } from '@navikt/fp-constants';
import {
    OppholdÅrsakType,
    PeriodeResultatÅrsak,
    SaksperiodeNy,
    Tidsperiode,
    UtsettelseÅrsakType,
    UttaksplanModus,
} from '@navikt/fp-types';
import {
    TidsperiodenString,
    UttaksdagenString,
    capitalizeFirstLetter,
    isValidTidsperiodeString,
} from '@navikt/fp-utils';

import { finnOgSettInnHull, settInnAnnenPartsUttak, slåSammenLikePerioder } from '../builder/uttaksplanbuilderUtils';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';

dayjs.extend(isoWeekday);

export function sorterPerioder(p1: Planperiode | SaksperiodeNy, p2: Planperiode | SaksperiodeNy) {
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

export const isUttaksperiode = (periode: Planperiode | SaksperiodeNy) => {
    return periode.kontoType !== undefined && periode.utsettelseÅrsak === undefined;
};

export const isPrematuruker = (periode: Planperiode | SaksperiodeNy) => {
    return (
        periode.kontoType !== undefined && periode.resultat?.årsak === PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER
    );
};

export const isUttaksperiodeAnnenPart = (periode: Planperiode) => {
    if (!periode.readOnly) {
        return false;
    }

    return periode.kontoType !== undefined && periode.utsettelseÅrsak === undefined;
};

export const isForeldrepengerFørFødselPeriode = (periode: Planperiode) => {
    return periode.kontoType !== undefined && periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL';
};

export const isUtsettelsesperiode = (periode: Planperiode) => {
    return (
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER
    );
};

export const isUtsettelsesperiodeAnnenPart = (periode: Planperiode) => {
    if (!periode.readOnly) {
        return false;
    }

    return periode.utsettelseÅrsak !== undefined;
};

export const isUttaksperiodeAnnenpartEøs = (periode: Planperiode) => {
    return periode.trekkdager !== undefined;
};

export const isAnnenPartsPeriode = (periode: Planperiode) => {
    return isUtsettelsesperiodeAnnenPart(periode) || isUttaksperiodeAnnenPart(periode);
};

export const isOverføringsperiode = (periode: Planperiode) => {
    return periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Planperiode) => {
    return periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Planperiode) => {
    return periode.resultat && periode.resultat.innvilget !== true;
};

export const isHull = (periode: Planperiode) => {
    return periode.periodeHullÅrsak !== undefined && periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER;
};

export const isPeriodeUtenUttak = (periode: Planperiode) => {
    return periode.periodeHullÅrsak !== undefined && periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);

    if (erMor) {
        return intl.formatMessage(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Bør ikkje ha dynamiske testId'ar
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}` },
            { foreldernavn: navn },
        );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore Bør ikkje ha dynamiske testId'ar
    return intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn: navn });
};

export const finnTekstForUtsettelseÅrsak = (intl: IntlShape, utsettelseÅrsak: UtsettelseÅrsakType) => {
    switch (utsettelseÅrsak) {
        case UtsettelseÅrsakType.Arbeid:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ARBEID' });
        case UtsettelseÅrsakType.Ferie:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.LOVBESTEMT_FERIE' });
        case UtsettelseÅrsakType.Fri:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.FRI' });
        case UtsettelseÅrsakType.HvØvelse:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.HV_ØVELSE' });
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.BARN_INNLAGT' });
        case UtsettelseÅrsakType.InstitusjonSøker:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_INNLAGT' });
        case UtsettelseÅrsakType.NavTiltak:
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.NAV_TILTAK' });
        case UtsettelseÅrsakType.Sykdom:
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

        const oppPeriode = oppsplittetPeriode[index - 1];
        oppPeriode.tom = datoWrapper.erFom ? UttaksdagenString(datoWrapper.dato).forrige() : datoWrapper.dato;
        oppPeriode.id = `${oppPeriode.fom} - ${oppPeriode.tom} - ${oppPeriode.kontoType || oppPeriode.periodeHullÅrsak || oppPeriode.utsettelseÅrsak}`;

        if (index < datoerIPerioden.length - 1) {
            const endretPeriode = {
                ...periode,
                fom: datoWrapper.erFom ? datoWrapper.dato : UttaksdagenString(datoWrapper.dato).neste(),
                tom: undefined!,
            };

            if (isUttaksperiodeAnnenpartEøs(endretPeriode)) {
                oppsplittetPeriode.push({ ...endretPeriode, trekkdager: 0 });
            } else {
                oppsplittetPeriode.push(endretPeriode);
            }
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiodeString({ fom: p.fom, tom: p.tom }));
};

export const normaliserPerioder = (søkersPerioder: Planperiode[], annenPartsPerioder: Planperiode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = søkersPerioder.reduce((res, p) => {
        res.push({ dato: p.fom, erFom: true }, { dato: p.tom, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsPerioder.reduce((res, p) => {
        res.push({ dato: p.fom, erFom: true }, { dato: p.tom, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);

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

    const alleUnikeDatoer = alleDatoer.reduce((result, datoWrapper) => {
        if (!result.some((d) => d.dato === datoWrapper.dato)) {
            result.push(datoWrapper);
        }
        return result;
    }, [] as SplittetDatoType[]);
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

const getReadOnlyStatus = (modus: UttaksplanModus, gjelderAnnenPart: boolean) => {
    if (modus === 'planlegger') {
        return false;
    }

    if (modus === 'innsyn') {
        return true;
    }

    return gjelderAnnenPart;
};

export const mapSaksperiodeTilPlanperiode = (
    saksperioder: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
    familiehendelsedato: string,
    modus: UttaksplanModus,
) => {
    const result: Planperiode[] = [];
    const saksperioderUtenAvslåttePerioder = saksperioder.filter((p) => {
        if (p.resultat) {
            if (p.resultat.årsak === PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER) {
                return true;
            }

            return p.resultat.innvilget;
        }

        return true;
    });

    for (const p of saksperioderUtenAvslåttePerioder) {
        const tidsperiodenKrysserFamdato =
            dayjs(p.fom).isBefore(familiehendelsedato) && dayjs(p.tom).isAfter(familiehendelsedato);

        if (tidsperiodenKrysserFamdato) {
            const planperiodeFør: Planperiode = {
                ...p,
                fom: p.fom,
                tom: UttaksdagenString(familiehendelsedato).forrige(),
                id: `${p.fom} - ${familiehendelsedato} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                readOnly: getReadOnlyStatus(modus, gjelderAnnenPart),
            };

            const planperiodeEtter: Planperiode = {
                ...p,
                fom: UttaksdagenString(familiehendelsedato).denneEllerNeste(),
                tom: p.tom,
                id: `${familiehendelsedato} - ${p.tom} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                readOnly: getReadOnlyStatus(modus, gjelderAnnenPart),
            };

            result.push(planperiodeFør, planperiodeEtter);
        } else {
            const planperiode: Planperiode = {
                ...p,
                id: `${p.fom} - ${p.tom} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                readOnly: getReadOnlyStatus(modus, gjelderAnnenPart),
            };

            result.push(planperiode);
        }
    }

    return result;
};

const getForelderForPeriode = (
    søkerErFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
    oppholdsårsak: OppholdÅrsakType | undefined,
): Forelder => {
    if (oppholdsårsak || gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }

    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
};

type UtledKomplettPlanParams = {
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    gjelderAdopsjon: boolean;
    bareFarMedmorHarRett: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    modus: UttaksplanModus;
};
export const utledKomplettPlan = ({
    familiehendelsedato,
    erFarEllerMedmor,
    søkersPerioder,
    annenPartsPerioder,
    gjelderAdopsjon,
    bareFarMedmorHarRett,
    harAktivitetskravIPeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak,
    modus,
}: UtledKomplettPlanParams) => {
    const søkersPlanperioder = finnOgSettInnHull(
        mapSaksperiodeTilPlanperiode(søkersPerioder, erFarEllerMedmor, false, familiehendelsedato, modus),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, modus)
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
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};
