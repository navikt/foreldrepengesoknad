import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    NavnPåForeldre,
    isAdoptertBarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { UttaksdagenString, formatDateIso, formaterDatoUtenDag, getFamiliehendelsedato } from '@navikt/fp-utils';
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

    const erIPlanleggerModus = modus === 'planlegger';

    const familiehendelsesdato = getFamiliehendelsedato(barn);

    // Filtrer bort annen parts perioder som er identiske med søker sine perioder
    const unikePerioder = uttaksplan.reduce<Planperiode[]>((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = uttaksplan.filter((p) => p.fom === periode.fom && p.tom === periode.tom);
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, []);

    const res = unikePerioder.reduce<CalendarPeriodWithLabel[]>((acc, periode) => {
        const color = erIPlanleggerModus
            ? getKalenderFargeForPeriodeTypePlanlegger(periode, erFarEllerMedmor, uttaksplan)
            : getKalenderFargeForPeriodeType(periode, erFarEllerMedmor, uttaksplan, barn);

        const legendLabel = getLegendLabelFromPeriode(periode);

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                {
                    fom: periode.fom,
                    tom: dayjs(barnehagestartdato).subtract(1, 'day').format('YYYY-MM-DD'),
                    legendLabel,
                    color,
                    srText: getKalenderSkjermlesertekstForPeriode(
                        {
                            ...periode,
                            fom: periode.fom,
                            tom: dayjs(barnehagestartdato).subtract(1, 'day').format('YYYY-MM-DD'),
                        },
                        navnPåForeldre,
                        intl,
                    ),
                },
                {
                    fom: dayjs(barnehagestartdato).add(1, 'day').format('YYYY-MM-DD'),
                    tom: periode.tom,
                    legendLabel,
                    color,
                    srText: getKalenderSkjermlesertekstForPeriode(
                        {
                            ...periode,
                            fom: dayjs(barnehagestartdato).add(1, 'day').format('YYYY-MM-DD'),
                            tom: periode.tom,
                        },
                        navnPåForeldre,
                        intl,
                    ),
                },
            ];
        }

        const fom = dayjs(periode.fom).isSame(dayjs(familiehendelsesdato), 'd')
            ? formatDateIso(UttaksdagenString(periode.fom).neste())
            : formatDateIso(periode.fom);
        const tom = dayjs(periode.tom).isSame(dayjs(familiehendelsesdato), 'd')
            ? formatDateIso(UttaksdagenString(periode.tom).forrige())
            : formatDateIso(periode.tom);
        return [
            ...acc,
            {
                fom,
                tom,
                legendLabel,
                color,
                srText: getKalenderSkjermlesertekstForPeriode({ ...periode, fom, tom }, navnPåForeldre, intl),
            },
        ];
    }, []);

    const perioderForVisning =
        barnehagestartdato === undefined
            ? res
            : res
                  .concat({
                      fom: barnehagestartdato,
                      tom: barnehagestartdato,
                      color: 'PURPLE',
                      legendLabel: 'BARNEHAGEPLASS',
                      srText: intl.formatMessage({ id: 'kalender.barnehageplass' }),
                  } satisfies CalendarPeriodWithLabel)
                  .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, familiehendelsesdato) ?? 0;
    perioderForVisning.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: 'PINK',
        legendLabel: getFamiliehendelseKalendarLabel(barn),
        srText: getSkjermlesertekstForFamiliehendelse(barn, intl),
    });

    return slåSammenPerioder(perioderForVisning);
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
                if (!p.erAnnenPartEøs && p.morsAktivitet === 'IKKE_OPPGITT') {
                    if (p.gradering?.arbeidstidprosent) {
                        return 'FARS_DEL_AKTIVITETSFRI_GRADERT';
                    }

                    return 'FARS_DEL_AKTIVITETSFRI';
                }

                if (!p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR') {
                    if (p.samtidigUttak && p.samtidigUttak > 0) {
                        return 'SAMTIDIG_UTTAK';
                    }

                    if (p.gradering?.arbeidstidprosent) {
                        return 'FARS_DEL_GRADERT';
                    }

                    return 'FARS_DEL';
                }

                if (!p.erAnnenPartEøs && p.samtidigUttak && p.samtidigUttak > 0) {
                    return 'SAMTIDIG_UTTAK';
                }

                if (!p.erAnnenPartEøs && p.gradering?.arbeidstidprosent) {
                    return 'MORS_DEL_GRADERT';
                }

                return 'MORS_DEL';
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

    const erAnnenForeldersPeriode = !erPeriodeForSøker(periode, erFarEllerMedmor);
    const samtidigUttaksprosent =
        isUttaksperiode(periode) && !periode.erAnnenPartEøs ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (
        !annenForelderSamtidigUttaksperiode &&
        !samtidigUttaksprosent &&
        isUttaksperiode(periode) &&
        !periode.erAnnenPartEøs &&
        periode.gradering
    ) {
        if (erFarEllerMedmor) {
            return erAnnenForeldersPeriode ? 'BLUESTRIPED' : 'GREENSTRIPED';
        }

        return erAnnenForeldersPeriode ? 'GREENSTRIPED' : 'BLUESTRIPED';
    }

    if (!periode.kontoType) {
        return 'NONE';
    }

    const forelder = periode.erAnnenPartEøs ? undefined : periode.forelder;
    return getUttaksperiodeFarge(periode.kontoType, forelder, erFarEllerMedmor);
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
    if (!periode.erAnnenPartEøs && periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? 'BLUEOUTLINE' : 'GREENOUTLINE';
    }
    if (!periode.erAnnenPartEøs && periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return 'NONE';
};

const erPeriodeForSøker = (periode: Planperiode, erFarEllerMedmor: boolean) =>
    !periode.erAnnenPartEøs &&
    ((periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor));

const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent =
        isUttaksperiode(periode) && !periode.erAnnenPartEøs ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (!periode.erAnnenPartEøs && periode.utsettelseÅrsak) {
        return 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return 'NONE';
    }

    if (
        !periode.erAnnenPartEøs &&
        (periode.forelder === 'MOR' ||
            (periode.kontoType === 'FORELDREPENGER' && periode.morsAktivitet === 'IKKE_OPPGITT'))
    ) {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'BLUESTRIPED';
        }

        return 'BLUE';
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'FAR_MEDMOR') {
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
        if (!periode.erAnnenPartEøs && periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'BLACKOUTLINE';
        }
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato) ? 'BLACK' : 'NONE';
    }

    if (!periode.erAnnenPartEøs && periode.utsettelseÅrsak) {
        return periode.forelder === 'FAR_MEDMOR' ? 'GREENOUTLINE' : 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return getKalenderFargeForPeriodeUtenUttak(periode, barn);
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
    }

    if ((!periode.erAnnenPartEøs && periode.overføringÅrsak) || isUttaksperiode(periode)) {
        return getKalenderFargeForUttaksperiode(periode, allePerioder, erFarEllerMedmor);
    }

    if (!periode.erAnnenPartEøs && periode.oppholdÅrsak && periode.forelder) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    if (!erPeriodeForSøker(periode, erFarEllerMedmor)) {
        return getKalenderFargeForAnnenPart(periode, erFarEllerMedmor);
    }

    return 'NONE';
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

const getKalenderSkjermlesertekstForPeriode = (
    period: Planperiode,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const periodeNavn = getKalenderSkjermleserPeriodetekst(period, navnPåForeldre, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(period.fom),
            tilDato: formaterDatoUtenDag(period.tom),
        },
    );
};

const getKalenderSkjermleserPeriodetekst = (
    period: Planperiode,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const navn =
        period.erAnnenPartEøs || period.forelder === 'FAR_MEDMOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    const periodenTilhører = intl.formatMessage({ id: 'kalender.srText.PeriodenTil' }, { navn });

    if (period.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.PeriodeUtenUttak' });
    }

    if (period.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.TapteDager' });
    }

    if (period.kontoType) {
        switch (period.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerFørFødsel' });
            case 'MØDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Mødrekvote' });
            case 'FEDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fedrekvote' });
            case 'FELLESPERIODE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fellesperiode' });
            case 'FORELDREPENGER':
                return finnSkjermleserTekstForKvoteForeldrepenger(period, periodenTilhører, intl);
            default:
                return assertUnreachable('Error: ukjent kontoType i getKalenderSkjermleserPeriodetekst');
        }
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Utsettelse' });
};

const finnSkjermleserTekstForKvoteForeldrepenger = (
    period: Planperiode,
    periodenTilhører: string,
    intl: IntlShape,
): string => {
    if (!period.erAnnenPartEøs && period.morsAktivitet === 'IKKE_OPPGITT') {
        if (period.gradering?.arbeidstidprosent) {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieDelGradert' });
        }

        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieIkkeGradert' });
    }

    if (!period.erAnnenPartEøs && period.samtidigUttak && period.samtidigUttak > 0) {
        return intl.formatMessage({ id: 'kalender.srText.SamtidigUttaksperiode' });
    }

    if (!period.erAnnenPartEøs && period.gradering?.arbeidstidprosent) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerGradert' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
};
