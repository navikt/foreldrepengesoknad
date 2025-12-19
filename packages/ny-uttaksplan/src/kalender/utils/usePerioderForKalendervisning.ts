import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import { Barn, NavnPåForeldre, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { UttaksdagenString, formatDateIso, formaterDatoUtenDag, getFamiliehendelsedato } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from '../../utils/periodeUtils';
import { filtrerBortAnnenPartsIdentiskePerioder } from '../../utils/permisjonsperiodeUtils';

export const usePerioderForKalendervisning = (barnehagestartdato?: string): CalendarPeriod[] => {
    const intl = useIntl();

    const {
        uttaksplan,
        barn,
        foreldreInfo: { søker, navnPåForeldre },
    } = useUttaksplanData();

    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const erFarEllerMedmor = søker === 'FAR_ELLER_MEDMOR';

    const unikePerioder = filtrerBortAnnenPartsIdentiskePerioder(uttaksplan, erFarEllerMedmor);

    const res = unikePerioder.reduce<CalendarPeriod[]>((acc, periode) => {
        const color = getKalenderFargeForPeriode(periode, erFarEllerMedmor, uttaksplan, barn);

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                {
                    fom: periode.fom,
                    tom: dayjs(barnehagestartdato).subtract(1, 'day').format('YYYY-MM-DD'),
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
                      srText: intl.formatMessage({ id: 'kalender.barnehageplass' }),
                  } satisfies CalendarPeriod)
                  .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, familiehendelsesdato) ?? 0;
    perioderForVisning.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: 'PINK',
        srText: getSkjermlesertekstForFamiliehendelse(barn, intl),
    });

    return slåSammenPerioder(perioderForVisning);
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

const getKalenderFargeForPeriode = (
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

    if (!periode.erAnnenPartEøs && periode.forelder === 'MOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'BLUESTRIPED';
        }

        return 'BLUE';
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'FAR_MEDMOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'GREENSTRIPED';
        }
        if (periode.kontoType === 'FORELDREPENGER' && periode.morsAktivitet === 'IKKE_OPPGITT') {
            return 'GREENOUTLINE';
        }

        return 'GREEN';
    }

    return 'NONE';
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

    if (!period.erAnnenPartEøs && period.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.avslagFratrekkPleiepenger' });
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
