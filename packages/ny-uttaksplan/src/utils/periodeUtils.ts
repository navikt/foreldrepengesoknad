import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import { IntlShape } from 'react-intl';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import {
    MorsAktivitet,
    NavnPåForeldre,
    OppholdÅrsakType,
    PeriodeResultat,
    PeriodeResultatÅrsak,
    SaksperiodeNy,
    Tidsperiode,
    UtsettelseÅrsakType,
} from '@navikt/fp-types';
import {
    TidsperiodenString,
    UttaksdagenString,
    capitalizeFirstLetter,
    formatDateIso,
    getNavnGenitivEierform,
    isValidTidsperiodeString,
} from '@navikt/fp-utils';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';

export const Periodene = (perioder: Planperiode[]) => ({
    sort: () => [...perioder].sort(sorterPerioder),
});

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

export const isUttaksperiodeAnnenPart = (periode: Planperiode) => {
    if (!periode.gjelderAnnenPart) {
        return false;
    }

    return periode.kontoType !== undefined && periode.utsettelseÅrsak === undefined;
};

export const isForeldrepengerFørFødselPeriode = (periode: Planperiode) => {
    return periode.kontoType !== undefined && periode.kontoType === StønadskontoType.ForeldrepengerFørFødsel;
};

export const isUtsettelsesperiode = (periode: Planperiode) => {
    return periode.utsettelseÅrsak !== undefined;
};

export const isUtsettelsesperiodeAnnenPart = (periode: Planperiode) => {
    if (!periode.gjelderAnnenPart) {
        return false;
    }

    return periode.utsettelseÅrsak !== undefined;
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

export const finnTidligerePerioder = (perioder: Planperiode[]): Planperiode[] => {
    return perioder.filter(({ tom }) => dayjs(tom).isBefore(dayjs(), 'd'));
};

export const finnNåværendePerioder = (perioder: Planperiode[]): Planperiode[] => {
    return perioder.filter(({ fom, tom }) => dayjs().isBetween(fom, tom, 'd', '[]'));
};

export const finnFremtidigePerioder = (perioder: Planperiode[]): Planperiode[] => {
    return perioder.filter(({ fom }) => dayjs(fom).isAfter(dayjs(), 'd'));
};

export const finnDuplikatePerioderPgaArbeidsforohld = (periode: Planperiode, perioder: Planperiode[]) => {
    return perioder
        .filter((p) => periode !== p)
        .filter((p) =>
            isEqual(
                getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold(p),
                getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold(periode),
            ),
        );
};

export const erDuplikatPeriodePgaFlereArbeidsforhold = (
    periode: Planperiode,
    uttaksperiodeDtoListe: Planperiode[],
): boolean => {
    return finnDuplikatePerioderPgaArbeidsforohld(periode, uttaksperiodeDtoListe).length > 0;
};

export const getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold = ({
    ...uttaksperiodeDtoUtenArbeidsgiverInfo
}: Planperiode) => {
    return uttaksperiodeDtoUtenArbeidsgiverInfo;
};

export const gyldigePerioderForVisning = (periode: Planperiode, erPlanVedtatt: boolean): boolean => {
    if (!erPlanVedtatt) {
        return true;
    }
    if (periode?.resultat?.innvilget) return true;

    if (
        periode.resultat?.årsak !== PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER &&
        periode.resultat?.trekkerDager === true
    ) {
        return true;
    }
    return false;
};

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: Planperiode,
    index: number,
    perioder: Planperiode[],
) => {
    const likePerioder = perioder.filter(
        (periode2, index_periode2) =>
            index !== index_periode2 &&
            dayjs(periode.fom).isSame(periode2.fom, 'd') &&
            dayjs(periode.tom).isSame(periode2.tom, 'd'),
    );

    if (likePerioder.length === 0) {
        return true;
    }

    const innvilgedePerioder = likePerioder.filter(periodeErInnvilget);

    if (periodeErInnvilget(periode) === false && innvilgedePerioder.length > 0) {
        return false;
    }

    return true;
};

export const getCleanedPlanForVisning = (
    plan: Planperiode[] | undefined,
    erPlanVedtatt: boolean,
): Planperiode[] | undefined => {
    if (plan === undefined) {
        return undefined;
    }
    const filtrertPlan = plan.filter((periode) => !isOppholdsperiode(periode));
    if (erPlanVedtatt) {
        const utenOverlappendeAvslåttePerioder = filtrertPlan.filter((p, index) =>
            filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode(p, index, plan),
        );

        const gyldigePerioder = utenOverlappendeAvslåttePerioder.filter((p) =>
            gyldigePerioderForVisning(p, erPlanVedtatt),
        );

        return gyldigePerioder;
    } else {
        return filtrertPlan;
    }
};

const isoStringFormat = 'YYYY-MM-DD';

const finnNesteMuligeUttaksdag = (dato: string): string => {
    const nesteDag = dayjs(dato).add(1, 'day');
    return nesteDag.isoWeekday() >= 6
        ? nesteDag.add(1, 'weeks').startOf('isoWeek').format(isoStringFormat)
        : nesteDag.format(isoStringFormat);
};

export const erSammenhengende = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    return (
        finnNesteMuligeUttaksdag(tidsperiode1.tom) === tidsperiode2.fom ||
        dayjs(tidsperiode1.tom).add(1, 'days').isSame(tidsperiode2.fom, 'days')
    );
};

export const erHullMellomPerioder = (periode: Planperiode, nestePeriode?: Planperiode) => {
    const periodeTidsperiode = { fom: periode.fom, tom: periode.tom };
    const nestePeriodeTidsperiode = nestePeriode ? { fom: nestePeriode.fom, tom: nestePeriode.tom } : undefined;
    return (
        nestePeriodeTidsperiode !== undefined &&
        !erSammenhengende(periodeTidsperiode, nestePeriodeTidsperiode) &&
        dayjs(periodeTidsperiode.tom).isBefore(nestePeriodeTidsperiode.fom, 'd')
    );
};

const isValidStillingsprosent = (pst: number | undefined): boolean => pst !== undefined && isNaN(pst) === false;

const prettifyProsent = (pst: number | undefined): number | undefined => {
    if (pst === undefined) {
        return undefined;
    }

    const nbr = pst;
    if (isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getStønadskontoForelderNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    navnPåForeldre: NavnPåForeldre,
    periodeResultat: PeriodeResultat | undefined,
    morsAktivitet: MorsAktivitet | undefined,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if (
        (erFarEllerMedmor && konto === StønadskontoType.Fedrekvote) ||
        (!erFarEllerMedmor && konto === StønadskontoType.Mødrekvote)
    ) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === StønadskontoType.Foreldrepenger) {
            if (
                periodeResultat?.trekkerMinsterett ||
                (!periodeResultat && morsAktivitet === MorsAktivitet.IkkeOppgitt)
            ) {
                return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
            }
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }

    if (!konto) {
        //TODO Denne skal jo ikkje kun skje (ref typen), men Andreas meinar at det kanskje skjer?
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.undefined' });
    }

    return finnTekstForStønadskontoType(intl, konto);
};

const finnTekstForStønadskontoType = (intl: IntlShape, konto: StønadskontoType) => {
    switch (konto) {
        case StønadskontoType.Fedrekvote:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.FEDREKVOTE' });
        case StønadskontoType.Fellesperiode:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.FELLESPERIODE' });
        case StønadskontoType.Foreldrepenger:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.FORELDREPENGER' });
        case StønadskontoType.ForeldrepengerFørFødsel:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.FORELDREPENGER_FØR_FØDSEL' });
        case StønadskontoType.Mødrekvote:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.MØDREKVOTE' });
        case StønadskontoType.AktivitetsfriKvote:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE' });
    }
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined,
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        let prosent = (100 - stillingsPst) * 100;
        prosent = Math.round(prosent) / 100;

        return prosent;
    }
    return undefined;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    return erMor
        ? //@ts-ignore Bør ikkje ha dynamiske testId'ar
          intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}` }, { foreldernavn: navn })
        : //@ts-ignore Bør ikkje ha dynamiske testId'ar
          intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn: navn });
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

export const getPeriodeTittel = (
    intl: IntlShape,
    periode: Planperiode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    if (isAvslåttPeriode(periode)) {
        if (periode.resultat?.årsak === PeriodeResultatÅrsak.AVSLAG_UTSETTELSE_TILBAKE_I_TID) {
            return intl.formatMessage({ id: 'uttaksplan.avslåttPeriode.utsettelse' });
        }

        return intl.formatMessage({ id: 'uttaksplan.avslåttPeriode' });
    }
    if (isUttaksperiode(periode)) {
        const tittelMedNavn = getStønadskontoForelderNavn(
            intl,
            periode.kontoType!,
            navnPåForeldre,
            periode.resultat,
            periode.morsAktivitet,
            erFarEllerMedmor,
            erAleneOmOmsorg,
        );
        const tittel = tittelMedNavn;
        if (
            (periode.gradering && isValidStillingsprosent(periode.gradering.arbeidstidprosent)) ||
            (periode.samtidigUttak && isValidStillingsprosent(periode.samtidigUttak))
        ) {
            const graderingsProsent = periode.gradering
                ? prettifyProsent(periode.gradering.arbeidstidprosent)
                : undefined;
            const samtidigUttaksProsent = periode.samtidigUttak ? prettifyProsent(periode.samtidigUttak) : undefined;
            return `${tittel} ${intl.formatMessage(
                { id: 'gradering.prosent' },
                {
                    stillingsprosent: getUttaksprosentFromStillingsprosent(graderingsProsent, samtidigUttaksProsent),
                },
            )}`;
        }

        return tittel;
    }
    if (isOverføringsperiode(periode)) {
        return getStønadskontoForelderNavn(
            intl,
            periode.kontoType!,
            navnPåForeldre,
            periode.resultat,
            periode.morsAktivitet,
            erFarEllerMedmor,
        );
    }
    if (isUtsettelsesperiode(periode)) {
        if (periode.utsettelseÅrsak) {
            return finnTekstForUtsettelseÅrsak(intl, periode.utsettelseÅrsak);
        }
        return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ukjent' });
    }
    return '';
};

const periodeErInnvilget = (periode: Planperiode): boolean => !!periode.resultat?.innvilget;

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
                fom: formatDateIso(datoWrapper.dato),
                tom: undefined!,
            });
            return;
        }

        oppsplittetPeriode[index - 1].tom = datoWrapper.erFom
            ? formatDateIso(UttaksdagenString(datoWrapper.dato).forrige())
            : formatDateIso(datoWrapper.dato);

        if (index < datoerIPerioden.length - 1) {
            oppsplittetPeriode.push({
                ...periode,
                fom: formatDateIso(datoWrapper.erFom ? datoWrapper.dato : UttaksdagenString(datoWrapper.dato).neste()),
                tom: undefined!,
            });
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiodeString({ fom: p.fom, tom: p.tom }));
};

export const normaliserPerioder = (søkersPerioder: Planperiode[], annenPartsPerioder: Planperiode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = søkersPerioder.reduce((res, p) => {
        res.push({ dato: p.fom, erFom: true });
        res.push({ dato: p.tom, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsPerioder.reduce((res, p) => {
        res.push({ dato: p.fom, erFom: true });
        res.push({ dato: p.tom, erFom: false });
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
    const normaliserteEgnePerioder: Planperiode[] = [];
    const normaliserteAnnenPartsPerioder: Planperiode[] = [];

    søkersPerioder.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteEgnePerioder.push(...oppsplittetPeriode);
    });

    annenPartsPerioder.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteAnnenPartsPerioder.push(...oppsplittetPeriode);
    });

    return {
        normaliserteEgnePerioder,
        normaliserteAnnenPartsPerioder,
    };
};

export const filtrerAnnenPartsUttakNårIkkeSamtidigUttak = (
    annenPartsPerioder: Planperiode[],
    søkerensPerioder: Planperiode[],
): Planperiode[] => {
    const filtrerteAnnenPartsPerioder = annenPartsPerioder.filter((periode) => {
        if (!isUttaksperiode(periode)) {
            return true;
        }
        const overlappendeSøkersPeriode = søkerensPerioder.find((p) => {
            return TidsperiodenString({ fom: p.fom, tom: p.tom }).overlapper({ fom: periode.fom, tom: periode.tom });
        });

        if (!overlappendeSøkersPeriode) {
            return true;
        }
        const beholdUttaksSomOverlapperAnnenPartsPeriode =
            overlappendeSøkersPeriode?.resultat?.innvilget &&
            isUttaksperiode(overlappendeSøkersPeriode) &&
            isUttaksperiode(periode)
                ? periode.samtidigUttak !== undefined || overlappendeSøkersPeriode.samtidigUttak !== undefined
                : true;
        return beholdUttaksSomOverlapperAnnenPartsPeriode;
    });
    return filtrerteAnnenPartsPerioder;
};

export const leggTilVisningsInfo = (
    annenPartsPerioder: Planperiode[],
    søkerensPerioder: Planperiode[],
): Planperiode[] => {
    const annenPartsPerioderMedVisningsInfo = annenPartsPerioder.map((periode): Planperiode => {
        const overlappendeSøkersPeriode = søkerensPerioder.find((p) => {
            return TidsperiodenString({ fom: p.fom, tom: p.tom }).overlapper({ fom: periode.fom, tom: periode.tom });
        });
        const erInnvilgetSamtidigUttak = overlappendeSøkersPeriode?.resultat?.innvilget
            ? periode.samtidigUttak !== undefined || overlappendeSøkersPeriode.samtidigUttak !== undefined
            : false;
        if (erInnvilgetSamtidigUttak) {
            return {
                ...periode,
                // visIPlan: false,
            };
        }
        const overlapperMedSøkerensPeriodeSomTrekkerDager =
            overlappendeSøkersPeriode?.resultat?.innvilget || overlappendeSøkersPeriode?.resultat?.trekkerDager;

        if (overlapperMedSøkerensPeriodeSomTrekkerDager) {
            return {
                ...periode,
                // visIPlan: false,
            };
        }

        return {
            ...periode,
            // visIPlan: true,
        };
    });
    return annenPartsPerioderMedVisningsInfo;
};

export const getPerioderForVisning = (perioder: Planperiode[]): Planperiode[] => {
    //  erAnnenPartsPeriode: boolean
    return perioder
        .map((periode): Planperiode => {
            return {
                ...periode,
                // gjelderAnnenPart: erAnnenPartsPeriode,
            };
        })
        .filter(
            (p) =>
                isValidTidsperiodeString({ fom: p.fom, tom: p.tom }) &&
                (isUttaksperiode(p) || isOverføringsperiode(p) || isUtsettelsesperiode(p)),
        );
};

export const getOverlappendePeriodeTittel = (
    søkerensPeriode: Planperiode,
    overlappendePeriodeAnnenPart: Planperiode,
    intl: IntlShape,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
) => {
    if (søkerensPeriode.utsettelseÅrsak) {
        return getStønadskontoForelderNavn(
            intl,
            overlappendePeriodeAnnenPart.kontoType!,
            navnPåForeldre,
            overlappendePeriodeAnnenPart.resultat,
            overlappendePeriodeAnnenPart.morsAktivitet,
            erFarEllerMedmor,
        );
    }
    if (overlappendePeriodeAnnenPart.utsettelseÅrsak) {
        return 'Utsettelse';
    }
    return 'Samtidig uttak';
};

export const erAnnenPartsPrematurePeriode = (
    annenPartsPeriode: Planperiode,
    termindato: string | undefined,
): boolean => {
    return (
        !!termindato &&
        !annenPartsPeriode.resultat?.innvilget &&
        dayjs(annenPartsPeriode.tom).isBefore(dayjs(termindato), 'd') &&
        annenPartsPeriode.kontoType !== StønadskontoType.Fedrekvote
    );
};

export const skalAnnenPartsPeriodeVises = (annenPartsPeriode: Planperiode, termindato: string | undefined): boolean => {
    if (annenPartsPeriode.resultat?.innvilget) {
        return true;
    }
    return erAnnenPartsPrematurePeriode(annenPartsPeriode, termindato);
};

export const getTidsperiodeFromPlanperiode = (periode: Planperiode): Tidsperiode => {
    return {
        fom: periode.fom,
        tom: periode.tom,
    };
};

export const getPeriodeId = (planperiode: Planperiode) => {
    return `${planperiode.fom} - ${planperiode.tom} - ${planperiode.kontoType}`;
};

export const mapSaksperiodeTilPlanperiode = (
    saksperioder: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
    familiehendelsedato: string,
) => {
    const result: Planperiode[] = [];
    const saksperioderUtenAvslåttePerioder = saksperioder.filter((p) => (p.resultat ? p.resultat.innvilget : true));

    saksperioderUtenAvslåttePerioder.forEach((p) => {
        const tidsperiodenKrysserFamdato =
            dayjs(p.fom).isBefore(familiehendelsedato) && dayjs(p.tom).isAfter(familiehendelsedato);

        if (tidsperiodenKrysserFamdato) {
            const planperiodeFør: Planperiode = {
                ...p,
                fom: p.fom,
                tom: UttaksdagenString(familiehendelsedato).forrige(),
                id: `${p.fom} - ${familiehendelsedato} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                gjelderAnnenPart,
            };

            const planperiodeEtter: Planperiode = {
                ...p,
                fom: UttaksdagenString(familiehendelsedato).denneEllerNeste(),
                tom: p.tom,
                id: `${familiehendelsedato} - ${p.tom} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                gjelderAnnenPart,
            };

            result.push(planperiodeFør);
            result.push(planperiodeEtter);
        } else {
            const planperiode: Planperiode = {
                ...p,
                id: `${p.fom} - ${p.tom} - ${p.kontoType || p.oppholdÅrsak || p.utsettelseÅrsak || p.overføringÅrsak}`,
                forelder: getForelderForPeriode(erFarEllerMedmor, gjelderAnnenPart, p.oppholdÅrsak),
                gjelderAnnenPart,
            };

            result.push(planperiode);
        }
    });

    return result;
};

export const getForelderForPeriode = (
    søkerErFarEllerMedmor: boolean,
    gjelderAnnenPart: boolean,
    oppholdsårsak: OppholdÅrsakType | undefined,
): Forelder => {
    if (oppholdsårsak || gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }

    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
};
