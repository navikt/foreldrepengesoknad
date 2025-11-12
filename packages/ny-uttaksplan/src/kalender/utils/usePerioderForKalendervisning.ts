import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    UttakUtsettelseÅrsak_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import {
    UttaksdagenString,
    capitalizeFirstLetter,
    formatDateIso,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
    getNavnGenitivEierform,
} from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { LegendLabel } from '../../types/LegendLabel';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from '../../utils/periodeUtils';

export type CalendarPeriodWithLabel = CalendarPeriod & { legendLabel?: LegendLabel };

export const usePerioderForKalendervisning = (barnehagestartdato?: string): CalendarPeriodWithLabel[] => {
    const intl = useIntl();

    const { uttaksplan, barn, erFarEllerMedmor, modus, navnPåForeldre } = useUttaksplanData();

    const unikeUtsettelseÅrsaker = getUnikeUtsettelsesårsaker(uttaksplan);

    const foreldrepengerHarAktivitetskrav =
        uttaksplan.some((p) => p.kontoType === 'FORELDREPENGER') &&
        uttaksplan.some((p) => p.kontoType === 'AKTIVITETSFRI_KVOTE');

    const erIPlanleggerModus = modus === 'planlegger';

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const allePerioderBortsettFraFamiliehendelseperioden = uttaksplan.filter(
        (p) =>
            !(dayjs(p.fom).isSame(familiehendelsesdato, 'd') && dayjs(p.tom).isSame(familiehendelsesdato, 'd')) &&
            p.fom !== undefined &&
            p.tom !== undefined,
    );

    const unikePerioder = allePerioderBortsettFraFamiliehendelseperioden.reduce((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = allePerioderBortsettFraFamiliehendelseperioden.filter(
            (p) => p.fom === periode.fom && p.tom === periode.tom,
        );
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, [] as Planperiode[]);

    const res = unikePerioder.reduce((acc, periode) => {
        const color = erIPlanleggerModus
            ? getKalenderFargeForPeriodeTypePlanlegger(
                  periode,
                  erFarEllerMedmor,
                  uttaksplan,
                  foreldrepengerHarAktivitetskrav,
              )
            : getKalenderFargeForPeriodeType(periode, erFarEllerMedmor, uttaksplan, barn);

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                {
                    fom: periode.fom,
                    tom: dayjs(barnehagestartdato).subtract(1, 'day').format('YYYY-MM-DD'),
                    color: color,
                    legendLabel: getLegendLabelFromPeriode(periode),
                },
                {
                    fom: dayjs(barnehagestartdato).add(1, 'day').format('YYYY-MM-DD'),
                    tom: periode.tom,
                    color: color,
                    legendLabel: getLegendLabelFromPeriode(periode),
                },
            ];
        }

        return [
            ...acc,
            {
                fom: dayjs(periode.fom).isSame(dayjs(familiehendelsesdato), 'd')
                    ? formatDateIso(UttaksdagenString(periode.fom).neste())
                    : formatDateIso(periode.fom),
                tom: formatDateIso(periode.tom),
                color,
                legendLabel: getLegendLabelFromPeriode(periode),
            },
        ];
    }, [] as CalendarPeriodWithLabel[]);

    const perioderForVisning =
        barnehagestartdato !== undefined
            ? res
                  .concat({
                      fom: barnehagestartdato,
                      tom: barnehagestartdato,
                      color: 'PURPLE',
                      legendLabel: 'BARNEHAGEPLASS',
                  } satisfies CalendarPeriodWithLabel)
                  .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
            : res;

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, familiehendelsesdato) ?? 0;
    perioderForVisning.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: 'PINK',
        legendLabel: getFamiliehendelseKalendarLabel(barn),
    });

    const perioderSlåttSammen = slåSammenPerioder(perioderForVisning);
    return perioderSlåttSammen.map((p) => ({
        ...p,
        srText: getKalenderSkjermlesertekstForPeriode(
            p,
            barn,
            navnAnnenPart,
            unikeUtsettelseÅrsaker,
            erFarEllerMedmor,
            intl,
        ),
    }));
};

const getKontoFarge = (konto: KontoTypeUttak, erFarEllerMedmor: boolean): CalendarPeriodColor => {
    switch (konto) {
        case 'FEDREKVOTE':
        case 'AKTIVITETSFRI_KVOTE':
            return erFarEllerMedmor ? 'GREEN' : 'LIGHTGREEN';
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return erFarEllerMedmor ? 'LIGHTBLUE' : 'BLUE';
        case 'FORELDREPENGER':
            return erFarEllerMedmor ? 'GREEN' : 'BLUE';
        case 'FELLESPERIODE':
            return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
        default:
            return 'NONE';
    }
};

const getUttaksperiodeFarge = (
    konto: KontoTypeUttak,
    forelder: BrukerRolleSak_fpoversikt | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): CalendarPeriodColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? 'GREEN' : 'BLUE';
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

const getForelderFarge = (forelder: BrukerRolleSak_fpoversikt, erFarEllerMedmor: boolean): CalendarPeriodColor => {
    if (forelder === 'MOR') {
        return erFarEllerMedmor ? 'LIGHTBLUE' : 'BLUE';
    }
    return erFarEllerMedmor ? 'GREEN' : 'LIGHTGREEN';
};

const slåSammenPerioder = (periods: CalendarPeriod[]) => {
    if (periods.length <= 1) {
        return periods;
    }

    return periods.reduce((res, period, index) => {
        const sisteRes = res.at(-1);

        if (
            index !== 0 &&
            sisteRes &&
            period.color === sisteRes.color &&
            dayjs(UttaksdagenString(sisteRes.tom).neste()).isSame(dayjs(period.fom), 'day')
        ) {
            sisteRes.tom = period.tom;
            return res;
        } else {
            res.push(period);
            return res;
        }
    }, [] as CalendarPeriod[]);
};

const getLegendLabelFromPeriode = (p: Planperiode): LegendLabel => {
    if (p.kontoType) {
        switch (p.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return 'MORS_DEL';
            case 'MØDREKVOTE':
            case 'FEDREKVOTE':
            case 'FELLESPERIODE':
            case 'FORELDREPENGER':
                if (p.forelder === 'FAR_MEDMOR') {
                    if (p.samtidigUttak && p.samtidigUttak > 0) {
                        return 'SAMTIDIG_UTTAK';
                    }

                    if (p.gradering?.arbeidstidprosent) {
                        return 'FARS_DEL_GRADERT';
                    }

                    return 'FARS_DEL';
                }

                if (p.samtidigUttak && p.samtidigUttak > 0) {
                    return 'SAMTIDIG_UTTAK';
                }

                if (p.gradering?.arbeidstidprosent) {
                    return 'MORS_DEL_GRADERT';
                }

                return 'MORS_DEL';
            case 'AKTIVITETSFRI_KVOTE':
                if (p.gradering?.arbeidstidprosent) {
                    return 'FARS_DEL_AKTIVITETSFRI_GRADERT';
                }

                return 'FARS_DEL_AKTIVITETSFRI';
            default:
                return assertUnreachable('Error: ukjent kontoType i getLegendLabelFromPeriode');
        }
    }

    if (p.periodeHullÅrsak) {
        if (p.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return 'NO_LABEL';
        }

        if (p.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
            return 'TAPTE_DAGER';
        }
    }

    return 'UTSETTELSE';
};

const getKalenderFargeForUttaksperiode = (
    periode: Planperiode,
    allePerioder: Planperiode[],
    erFarEllerMedmor: boolean,
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (
        !annenForelderSamtidigUttaksperiode &&
        !samtidigUttaksprosent &&
        isUttaksperiode(periode) &&
        periode.gradering
    ) {
        return erFarEllerMedmor ? 'GREENSTRIPED' : 'BLUESTRIPED';
    }

    if (!periode.kontoType) {
        return 'NONE';
    }

    return getUttaksperiodeFarge(periode.kontoType, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForPeriodeUtenUttak = (periode: Planperiode, barn: Barn): CalendarPeriodColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return 'BLACK';
    }
    return 'NONE';
};

const getKalenderFargeForAnnenPart = (periode: Planperiode, erFarEllerMedmor: boolean): CalendarPeriodColor => {
    if (periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? 'BLUEOUTLINE' : 'GREENOUTLINE';
    }
    if (periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return 'NONE';
};

const erPeriodeForSøker = (periode: Planperiode, erFarEllerMedmor: boolean) =>
    (periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor);

const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    foreldrepengerHarAktivitetskrav: boolean,
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (periode.utsettelseÅrsak) {
        return 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return 'NONE';
    }

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return 'BLUE';
    }

    if (periode.kontoType === 'AKTIVITETSFRI_KVOTE') {
        return 'BLUE';
    }

    if (periode.kontoType === 'FORELDREPENGER') {
        if (foreldrepengerHarAktivitetskrav) {
            return erFarEllerMedmor ? 'LIGHTGREEN' : 'BLUE';
        }

        return 'BLUE';
    }

    if (periode.forelder === 'MOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'BLUESTRIPED';
        }

        return 'BLUE';
    }

    if (periode.forelder === 'FAR_MEDMOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'GREENSTRIPED';
        }

        return 'GREEN';
    }

    return 'NONE';
};

const getKalenderFargeForPeriodeType = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    barn: Barn,
): CalendarPeriodColor => {
    if (isAvslåttPeriode(periode)) {
        if (periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'BLACKOUTLINE';
        }
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato) ? 'BLACK' : 'NONE';
    }

    if (periode.utsettelseÅrsak) {
        return periode.forelder === 'FAR_MEDMOR' ? 'GREENOUTLINE' : 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return getKalenderFargeForPeriodeUtenUttak(periode, barn);
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
    }

    if (periode.overføringÅrsak || isUttaksperiode(periode)) {
        return getKalenderFargeForUttaksperiode(periode, allePerioder, erFarEllerMedmor);
    }

    if (periode.oppholdÅrsak && periode.forelder) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    if (!erPeriodeForSøker(periode, erFarEllerMedmor)) {
        return getKalenderFargeForAnnenPart(periode, erFarEllerMedmor);
    }

    return 'NONE';
};

const getUnikeUtsettelsesårsaker = (allePerioderInklHull: Planperiode[]) => {
    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UttakUtsettelseÅrsak_fpoversikt => !!utsettelseÅrsak);
    return [...new Set(utsettelseÅrsaker)];
};

const getUtsettelseÅrsakTekst = (årsak: UttakUtsettelseÅrsak_fpoversikt, intl: IntlShape) => {
    if (årsak === 'ARBEID') {
        return intl.formatMessage({ id: `kalender.utsettelse.ARBEID` });
    }
    if (årsak === 'BARN_INNLAGT') {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_BARNET` });
    }
    if (årsak === 'SØKER_INNLAGT') {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_SØKER` });
    }
    if (årsak === 'LOVBESTEMT_FERIE') {
        return intl.formatMessage({ id: `kalender.utsettelse.LOVBESTEMT_FERIE` });
    }
    if (årsak === 'SØKER_SYKDOM') {
        return intl.formatMessage({ id: `kalender.utsettelse.SYKDOM` });
    }
    if (årsak === 'HV_ØVELSE') {
        return intl.formatMessage({ id: `kalender.utsettelse.HV_OVELSE` });
    }
    if (årsak === 'NAV_TILTAK') {
        return intl.formatMessage({ id: `kalender.utsettelse.NAV_TILTAK` });
    }
    return '';
};

const getUtsettelseLabel = (unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[], intl: IntlShape): string => {
    if (unikeUtsettelseÅrsaker.length === 1 && unikeUtsettelseÅrsaker[0] !== 'FRI') {
        const årsakTekst = getUtsettelseÅrsakTekst(unikeUtsettelseÅrsaker[0], intl);
        return intl.formatMessage({ id: 'kalender.utsettelse' }, { årsak: årsakTekst });
    }
    return intl.formatMessage({ id: 'kalender.dinUtsettelse' });
};

const getFamiliehendelseKalendarLabel = (barn: Barn): LegendLabel => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn) ? 'FØDSEL' : 'TERMIN';
    }
    return 'ADOPSJON';
};

const getFamiliehendelseKalendarLabelForSkjermleser = (barn: Barn, intl: IntlShape): string => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn)
            ? intl.formatMessage({ id: 'kalender.fødsel' })
            : intl.formatMessage({ id: 'kalender.termin' });
    }
    return intl.formatMessage({ id: 'kalender.adopsjon' });
};

const getSkjermlesertekstForFamiliehendelse = (barn: Barn, intl: IntlShape): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsenavn = getFamiliehendelseKalendarLabelForSkjermleser(barn, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.familiehendelse' },
        { familiehendelsenavn, dato: formaterDatoUtenDag(familiehendelsesdato) },
    );
};

const getKalenderPeriodenavn = (
    color: CalendarPeriodColor,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string => {
    switch (color) {
        case 'BLUE':
        case 'GREEN':
            return intl.formatMessage({ id: 'kalender.dinPeriode' });
        case 'BLUESTRIPED':
        case 'GREENSTRIPED':
            return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
        case 'LIGHTBLUE':
        case 'LIGHTGREEN':
            return intl.formatMessage(
                { id: 'kalender.annenPartPeriode' },
                { navnAnnenPart: getNavnGenitivEierform(capitalizeFirstLetter(navnAnnenPart), intl.locale) },
            );
        case 'LIGHTBLUEGREEN':
        case 'LIGHTGREENBLUE':
            return intl.formatMessage(
                { id: 'kalender.samtidigUttak' },
                { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
            );
        case 'GREENOUTLINE':
            return erFarEllerMedmor
                ? getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
                : intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  );

        case 'BLUEOUTLINE':
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  )
                : getUtsettelseLabel(unikeUtsettelseÅrsaker, intl);
        case 'BLACK':
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        case 'GRAY':
            return intl.formatMessage({ id: 'kalender.helg' });
        case 'BLACKOUTLINE':
            return intl.formatMessage({ id: 'kalender.pleiepenger' });
        default:
            return '';
    }
};

const getKalenderSkjermlesertekstForPeriode = (
    period: CalendarPeriod,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string | undefined => {
    if (['NONE', 'GRAY'].includes(period.color)) {
        return undefined;
    }
    if (period.color === 'PINK') {
        return getSkjermlesertekstForFamiliehendelse(barn, intl);
    }
    const periodeNavn = getKalenderPeriodenavn(
        period.color,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        erFarEllerMedmor,
        intl,
    );
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(period.fom),
            tilDato: formaterDatoUtenDag(period.tom),
        },
    );
};
