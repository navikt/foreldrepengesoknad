import { intlUtils, TidsperiodeDate } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { OppholdÅrsakType } from 'app/types/OppholdÅrsakType';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { IntlShape } from 'react-intl';
import { getNavnGenitivEierform, NavnPåForeldre } from './personUtils';
import { capitalizeFirstLetter } from './stringUtils';
import dayjs from 'dayjs';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import { isEqual } from 'lodash';
import { PeriodeResultat } from 'app/types/PeriodeResultat';
import { MorsAktivitet } from 'app/types/MorsAktivitet';
import { PeriodeResultatÅrsak } from 'app/types/PeriodeResultatÅrsak';

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
                getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold(periode)
            )
        );
};

export const erDuplikatPeriodePgaFlereArbeidsforhold = (
    periode: Periode,
    uttaksperiodeDtoListe: Periode[]
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
    if (periode.resultat.innvilget) return true;

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
    perioder: Periode[]
) => {
    const likePerioder = perioder.filter(
        (periode2, index_periode2) =>
            index !== index_periode2 &&
            dayjs(periode.fom).isSame(periode2.fom, 'd') &&
            dayjs(periode.tom).isSame(periode2.tom, 'd')
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
    erPlanVedtatt: boolean
): Periode[] | undefined => {
    if (plan === undefined) {
        return undefined;
    }
    const filtrertPlan = plan.filter((periode) => !isOppholdsperiode(periode));
    if (erPlanVedtatt) {
        const utenOverlappendeAvslåttePerioder = filtrertPlan.filter((p, index) =>
            filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode(p, index, plan)
        );

        const gyldigePerioder = utenOverlappendeAvslåttePerioder.filter((p) =>
            gyldigePerioderForVisning(p, erPlanVedtatt)
        );

        return gyldigePerioder;
    } else {
        return filtrertPlan;
    }
};

const finnForrigeMuligeUttaksdag = (dato: Date): Date => {
    const dagenFør = dayjs(dato).subtract(1, 'day');
    switch (dagenFør.isoWeekday()) {
        case 6:
            return dagenFør.subtract(1, 'day').toDate();
        case 7:
            return dagenFør.subtract(2, 'day').toDate();
        default:
            return dagenFør.toDate();
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

export const fyllInnHull = (periodeAcc: Periode[], periode: Periode, index: number, periodene: Periode[]) => {
    periodeAcc.push(periode);
    const nestePeriode = periodene[index + 1];
    if (
        erHullMellomPerioder(periode, nestePeriode)
        //    && !harAnnenForelderSamtidigUttakISammePeriode(periode, periodene) TODO
    ) {
        const tidsperiode = {
            fom: finnNesteMuligeUttaksdag(ISOStringToDate(periode.tom)!),
            tom: finnForrigeMuligeUttaksdag(ISOStringToDate(nestePeriode.fom)!),
        };

        const erEtter1Oktober2021 = dayjs(new Date()).isSameOrAfter(new Date('2021-10-01'), 'd');
        if (erEtter1Oktober2021) {
            periodeAcc.push({
                fom: dateToISOString(tidsperiode.fom),
                tom: dateToISOString(tidsperiode.tom),
                resultat: {} as PeriodeResultat,
            });
        } else {
            periodeAcc.push({
                fom: dateToISOString(tidsperiode.fom),
                tom: dateToISOString(tidsperiode.tom),
                resultat: {} as PeriodeResultat,
            });
        }
    }
    return periodeAcc;
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
    erFarEllerMedmor?: boolean,
    erAleneOmOmsorg?: boolean
) => {
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
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) }
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
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined
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
    erMor: boolean
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    return erMor
        ? intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn: navn })
        : intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn: navn });
};

export const getPeriodeTittel = (
    intl: IntlShape,
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor?: boolean,
    erAleneOmOmsorg?: boolean
): string => {
    if (isAvslåttPeriode(periode)) {
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
            erAleneOmOmsorg
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
            periode.morsAktivitet
        );
    }
    if (isUtsettelsesperiode(periode)) {
        if (periode.utsettelseÅrsak) {
            return intlUtils(intl, `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}`);
        }
        return intlUtils(intl, 'uttaksplan.utsettelsesårsak.ukjent');
    }
    //TODO getOppholdskontoNavn
    return '';
};

const periodeErInnvilget = (periode: Periode): boolean => periode.resultat && periode.resultat.innvilget;
