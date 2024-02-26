import dayjs from 'dayjs';
import { isEqual } from 'lodash';
import { IntlShape } from 'react-intl';

import { Forelder, ISOStringToDate, TidsperiodeDate, guid, intlUtils } from '@navikt/fp-common';
import { formatDateIso } from '@navikt/fp-utils';

import { MorsAktivitet } from 'app/types/MorsAktivitet';
import { OppholdÅrsakType } from 'app/types/OppholdÅrsakType';
import { Periode } from 'app/types/Periode';
import { PeriodeResultat } from 'app/types/PeriodeResultat';
import { PeriodeResultatÅrsak } from 'app/types/PeriodeResultatÅrsak';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';

import { Uttaksdagen } from './Uttaksdagen';
import { NavnPåForeldre, getNavnGenitivEierform } from './personUtils';
import { capitalizeFirstLetter } from './stringUtils';
import { Tidsperioden, getTidsperiode, isValidTidsperiode } from './tidsperiodeUtils';

export const Periodene = (perioder: Periode[]) => ({
    sort: () => [...perioder].sort(sorterPerioder),
});

export function sorterPerioder(p1: Periode, p2: Periode) {
    const t1 = getTidsperiode(p1);
    const t2 = getTidsperiode(p2);
    if (isValidTidsperiode(t1) === false || isValidTidsperiode(t2) === false) {
        return isValidTidsperiode(t1) ? 1 : -1;
    }
    if (dayjs(t1.fom).isSame(t2.fom, 'day')) {
        return 1;
    }

    if (Tidsperioden(t2).erOmsluttetAv(t1)) {
        return 1;
    }

    return dayjs(t1.fom).isBefore(t2.fom, 'day') ? -1 : 1;
}

export const isUttaksperiode = (periode: Periode) => {
    return periode.kontoType !== undefined && periode.utsettelseÅrsak === undefined;
};

export const isUtsettelsesperiode = (periode: Periode) => {
    return periode.utsettelseÅrsak !== undefined;
};

export const isOverføringsperiode = (periode: Periode) => {
    return periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Periode) => {
    return periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Periode) => {
    return periode.resultat && periode.resultat.innvilget !== true;
};

export const finnTidligerePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ tom }) => dayjs(tom).isBefore(dayjs(), 'd'));
};

export const finnNåværendePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ fom, tom }) => dayjs().isBetween(fom, tom, 'd', '[]'));
};

export const finnFremtidigePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ fom }) => dayjs(fom).isAfter(dayjs(), 'd'));
};

export const finnDuplikatePerioderPgaArbeidsforohld = (periode: Periode, perioder: Periode[]) => {
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
    periode: Periode,
    uttaksperiodeDtoListe: Periode[],
): boolean => {
    return finnDuplikatePerioderPgaArbeidsforohld(periode, uttaksperiodeDtoListe).length > 0;
};

export const getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold = ({
    gradering,
    ...uttaksperiodeDtoUtenArbeidsgiverInfo
}: Periode) => {
    return uttaksperiodeDtoUtenArbeidsgiverInfo;
};

export const gyldigePerioderForVisning = (periode: Periode, erPlanVedtatt: boolean): boolean => {
    if (!erPlanVedtatt) {
        return true;
    }
    if (periode.resultat && periode.resultat.innvilget) return true;

    if (
        periode.resultat &&
        periode.resultat.årsak !== PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER &&
        periode.resultat.trekkerDager === true
    ) {
        return true;
    }
    return false;
};

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: Periode,
    index: number,
    perioder: Periode[],
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
    plan: Periode[] | undefined,
    erPlanVedtatt: boolean,
): Periode[] | undefined => {
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

const finnNesteMuligeUttaksdag = (dato: Date): Date => {
    const nesteDag = dayjs(dato).add(1, 'day');
    return nesteDag.isoWeekday() >= 6 ? nesteDag.add(1, 'weeks').startOf('isoWeek').toDate() : nesteDag.toDate();
};

export const erSammenhengende = (tidsperiode1: TidsperiodeDate, tidsperiode2: TidsperiodeDate): boolean => {
    return (
        finnNesteMuligeUttaksdag(tidsperiode1.tom) === tidsperiode2.fom ||
        dayjs(tidsperiode1.tom).add(1, 'days').isSame(tidsperiode2.fom, 'days')
    );
};

export const erHullMellomPerioder = (periode: Periode, nestePeriode?: Periode) => {
    const periodeTidsperiode = { fom: ISOStringToDate(periode.fom)!, tom: ISOStringToDate(periode.tom)! };
    const nestePeriodeTidsperiode = nestePeriode
        ? { fom: ISOStringToDate(nestePeriode.fom)!, tom: ISOStringToDate(nestePeriode.tom)! }
        : undefined;
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
                (periodeResultat && periodeResultat.trekkerMinsterett) ||
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
        case StønadskontoType.Flerbarnsdager:
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.FLERBARNSDAGER' });
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
        ? intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn: navn })
        : intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn: navn });
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
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    if (isAvslåttPeriode(periode)) {
        if (periode.resultat.årsak === PeriodeResultatÅrsak.AVSLAG_UTSETTELSE_TILBAKE_I_TID) {
            return intlUtils(intl, 'uttaksplan.avslåttPeriode.utsettelse');
        }

        return intlUtils(intl, 'uttaksplan.avslåttPeriode');
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
        //TODO:
        // const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        //     intl,
        //     tittelMedNavn,
        //     periode,
        //     situasjon,
        //     familiehendelsesdato,
        //     termindato
        // );
        const tittel = tittelMedNavn;
        if (
            (periode.gradering && isValidStillingsprosent(periode.gradering.arbeidstidprosent)) ||
            (periode.samtidigUttak && isValidStillingsprosent(periode.samtidigUttak))
        ) {
            const graderingsProsent = periode.gradering
                ? prettifyProsent(periode.gradering.arbeidstidprosent)
                : undefined;
            const samtidigUttaksProsent = periode.samtidigUttak ? prettifyProsent(periode.samtidigUttak) : undefined;
            return `${tittel} ${intlUtils(intl, 'gradering.prosent', {
                stillingsprosent: getUttaksprosentFromStillingsprosent(graderingsProsent, samtidigUttaksProsent),
            })}`;
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
        return intlUtils(intl, 'uttaksplan.utsettelsesårsak.ukjent');
    }
    //TODO getOppholdskontoNavn
    return '';
};

const periodeErInnvilget = (periode: Periode): boolean => periode.resultat && periode.resultat.innvilget;

interface SplittetDatoType {
    dato: Date;
    erFom: boolean;
}

const splittPeriodePåDatoer = (periode: Periode, alleDatoer: SplittetDatoType[]) => {
    const datoerIPerioden = alleDatoer.filter((datoWrapper) =>
        Tidsperioden(getTidsperiode(periode)).inneholderDato(datoWrapper.dato),
    );
    const oppsplittetPeriode: Periode[] = [];

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
            ? formatDateIso(Uttaksdagen(datoWrapper.dato).forrige())
            : formatDateIso(datoWrapper.dato);

        if (index < datoerIPerioden.length - 1) {
            oppsplittetPeriode.push({
                ...periode,
                id: guid(),
                fom: formatDateIso(datoWrapper.erFom ? datoWrapper.dato : Uttaksdagen(datoWrapper.dato).neste()),
                tom: undefined!,
            });
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiode(getTidsperiode(p)));
};

export const normaliserPerioder = (søkersPerioder: Periode[], annenPartsPerioder: Periode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = søkersPerioder.reduce((res, p) => {
        res.push({ dato: ISOStringToDate(p.fom)!, erFom: true });
        res.push({ dato: ISOStringToDate(p.tom)!, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsPerioder.reduce((res, p) => {
        res.push({ dato: ISOStringToDate(p.fom)!, erFom: true });
        res.push({ dato: ISOStringToDate(p.tom)!, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);

    const alleDatoer = perioderTidsperioder.concat(annenPartsUttakTidsperioder).sort((d1, d2) => {
        if (d1.dato.getTime() - d2.dato.getTime() === 0) {
            if (!d1.erFom) {
                return 1;
            }

            if (!d2.erFom) {
                return -1;
            }
        }
        return d1.dato.getTime() - d2.dato.getTime();
    });
    const normaliserteEgnePerioder: Periode[] = [];
    const normaliserteAnnenPartsPerioder: Periode[] = [];

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
    annenPartsPerioder: Periode[],
    søkerensPerioder: Periode[],
): Periode[] => {
    const filtrerteAnnenPartsPerioder = annenPartsPerioder.filter((periode) => {
        if (!isUttaksperiode(periode)) {
            return true;
        }
        const overlappendeSøkersPeriode = søkerensPerioder.find((p) => {
            return Tidsperioden(getTidsperiode(p)).overlapper(getTidsperiode(periode));
        });

        if (!overlappendeSøkersPeriode) {
            return true;
        }
        const beholdUttaksSomOverlapperAnnenPartsPeriode =
            overlappendeSøkersPeriode &&
            overlappendeSøkersPeriode.resultat &&
            overlappendeSøkersPeriode.resultat.innvilget &&
            isUttaksperiode(overlappendeSøkersPeriode) &&
            isUttaksperiode(periode)
                ? periode.samtidigUttak !== undefined || overlappendeSøkersPeriode.samtidigUttak !== undefined
                : true;
        return beholdUttaksSomOverlapperAnnenPartsPeriode;
    });
    return filtrerteAnnenPartsPerioder;
};

export const leggTilVisningsInfo = (annenPartsPerioder: Periode[], søkerensPerioder: Periode[]): Periode[] => {
    const annenPartsPerioderMedVisningsInfo = annenPartsPerioder.map((periode) => {
        const overlappendeSøkersPeriode = søkerensPerioder.find((p) => {
            return Tidsperioden(getTidsperiode(p)).overlapper(getTidsperiode(periode));
        });
        const erInnvilgetSamtidigUttak =
            overlappendeSøkersPeriode &&
            overlappendeSøkersPeriode.resultat &&
            overlappendeSøkersPeriode.resultat.innvilget
                ? periode.samtidigUttak !== undefined || overlappendeSøkersPeriode.samtidigUttak !== undefined
                : false;
        if (erInnvilgetSamtidigUttak) {
            return {
                ...periode,
                visIPlan: false,
            };
        }
        const overlapperMedSøkerensPeriodeSomTrekkerDager =
            overlappendeSøkersPeriode &&
            overlappendeSøkersPeriode.resultat &&
            (overlappendeSøkersPeriode.resultat.innvilget || overlappendeSøkersPeriode.resultat.trekkerDager);

        if (overlapperMedSøkerensPeriodeSomTrekkerDager) {
            return {
                ...periode,
                visIPlan: false,
            };
        }

        return {
            ...periode,
            visIPlan: true,
        };
    });
    return annenPartsPerioderMedVisningsInfo;
};

export const getPerioderForVisning = (perioder: Periode[], erAnnenPartsPeriode: boolean): Periode[] => {
    return perioder
        .map((periode) => {
            return {
                ...periode,
                gjelderAnnenPart: erAnnenPartsPeriode,
                id: guid(),
            };
        })
        .filter(
            (p) =>
                isValidTidsperiode(getTidsperiode(p)) &&
                (isUttaksperiode(p) || isOverføringsperiode(p) || isUtsettelsesperiode(p)),
        );
};

export const getOverlappendePeriodeTittel = (
    søkerensPeriode: Periode,
    overlappendePeriodeAnnenPart: Periode,
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

export const erAnnenPartsPrematurePeriode = (annenPartsPeriode: Periode, termindato: string | undefined): boolean => {
    return (
        !!termindato &&
        !annenPartsPeriode.resultat.innvilget &&
        dayjs(annenPartsPeriode.tom).isBefore(dayjs(termindato), 'd') &&
        annenPartsPeriode.kontoType !== StønadskontoType.Fedrekvote
    );
};

export const skalAnnenPartsPeriodeVises = (annenPartsPeriode: Periode, termindato: string | undefined): boolean => {
    if (annenPartsPeriode.resultat.innvilget) {
        return true;
    }
    return erAnnenPartsPrematurePeriode(annenPartsPeriode, termindato);
};

export const getPeriodeForelder = (erFarEllerMedmor: boolean, periode: Periode): Forelder => {
    if (erFarEllerMedmor) {
        if (periode.gjelderAnnenPart) {
            return Forelder.mor;
        }
        return Forelder.farMedmor;
    }
    if (periode.gjelderAnnenPart) {
        return Forelder.farMedmor;
    }
    return Forelder.mor;
};
