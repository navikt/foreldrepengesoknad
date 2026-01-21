import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { UttaksdagenString, formaterDatoUtenDag, getFamiliehendelsedato } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import {
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor, isUttaksperiode } from '../../utils/periodeUtils';
import { filtrerBortAnnenPartsIdentiskePerioder } from './uttaksplanKalenderUtils';

export const usePerioderForKalendervisning = (
    endredePerioder: Array<{ fom: string; tom: string }>,
    barnehagestartdato?: string,
): CalendarPeriod[] => {
    const intl = useIntl();

    const {
        barn,
        foreldreInfo: { søker, navnPåForeldre },
        familiehendelsedato,
    } = useUttaksplanData();

    const saksperioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const erFarEllerMedmor = søker === 'FAR_ELLER_MEDMOR';

    const unikePerioder = filtrerBortAnnenPartsIdentiskePerioder(saksperioderInkludertTapteDager, erFarEllerMedmor);

    const kalenderPerioder = unikePerioder.reduce<CalendarPeriod[]>((acc, periode) => {
        const color = getKalenderFargeForPeriode(periode, erFarEllerMedmor, saksperioderInkludertTapteDager, barn);
        const isUpdated = endredePerioder.some((p) => p.fom === periode.fom && p.tom === periode.tom);

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [...acc, ...splittPeriodeITo(periode, barnehagestartdato, color, navnPåForeldre, intl, isUpdated)];
        }

        if (dayjs(familiehendelsedato).isBetween(periode.fom, periode.tom, 'day', '[]')) {
            return [...acc, ...splittPeriodeITo(periode, familiehendelsedato, color, navnPåForeldre, intl, isUpdated)];
        }

        return [
            ...acc,
            {
                fom: periode.fom,
                tom: periode.tom,
                color,
                srText: getKalenderSkjermlesertekstForPeriode(periode, navnPåForeldre, intl),
                isUpdated,
            },
        ];
    }, []);

    if (barnehagestartdato !== undefined) {
        kalenderPerioder.push({
            fom: barnehagestartdato,
            tom: barnehagestartdato,
            color: 'PURPLE',
            srText: intl.formatMessage({ id: 'kalender.barnehageplass' }),
        });
    }

    kalenderPerioder.push({
        fom: familiehendelsedato,
        tom: familiehendelsedato,
        color: 'PINK',
        srText: getSkjermlesertekstForFamiliehendelse(barn, intl),
    });

    kalenderPerioder.sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    return kalenderPerioder;
};

const getKalenderFargeForPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    erFarEllerMedmor: boolean,
    allePerioder: UttaksplanperiodeMedKunTapteDager[],
    barn: Barn,
): CalendarPeriodColor => {
    if (isAvslåttPeriode(periode)) {
        if (erVanligUttakPeriode(periode) && periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'BLACKOUTLINE';
        }
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato) ? 'BLACK' : 'NONE';
    }

    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent =
        isUttaksperiode(periode) && erVanligUttakPeriode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (erTapteDagerHull(periode)) {
        return 'BLACK';
    }

    if (erEøsUttakPeriode(periode)) {
        return 'NONE';
    }

    if (periode.utsettelseÅrsak) {
        return 'BLUEOUTLINE';
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
    period: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
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
    period: UttaksplanperiodeMedKunTapteDager,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const navn =
        erEøsUttakPeriode(period) || period.forelder === 'FAR_MEDMOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    const periodenTilhører = intl.formatMessage({ id: 'kalender.srText.PeriodenTil' }, { navn });

    if (erTapteDagerHull(period)) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.TapteDager' });
    }

    if (erVanligUttakPeriode(period) && period.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
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
    period: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    periodenTilhører: string,
    intl: IntlShape,
): string => {
    if (erEøsUttakPeriode(period)) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
    }

    if (period.morsAktivitet === 'IKKE_OPPGITT') {
        if (period.gradering?.arbeidstidprosent) {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieDelGradert' });
        }

        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieIkkeGradert' });
    }

    if (period.samtidigUttak && period.samtidigUttak > 0) {
        return intl.formatMessage({ id: 'kalender.srText.SamtidigUttaksperiode' });
    }

    if (period.gradering?.arbeidstidprosent) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerGradert' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
};

const getAnnenForelderSamtidigUttakPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    perioder: UttaksplanperiodeMedKunTapteDager[],
): UttaksplanperiodeMedKunTapteDager | undefined => {
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

const splittPeriodeITo = (
    periode: UttaksplanperiodeMedKunTapteDager,
    dato: string,
    color: CalendarPeriodColor,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
    isUpdated: boolean,
): CalendarPeriod[] => {
    return [
        {
            fom: periode.fom,
            tom: UttaksdagenString.forrige(dato).getDato(),
            color,
            srText: getKalenderSkjermlesertekstForPeriode(
                {
                    ...periode,
                    fom: periode.fom,
                    tom: UttaksdagenString.forrige(dato).getDato(),
                },
                navnPåForeldre,
                intl,
            ),
            isUpdated,
        },
        {
            fom: UttaksdagenString.neste(dato).getDato(),
            tom: periode.tom,
            color,
            srText: getKalenderSkjermlesertekstForPeriode(
                {
                    ...periode,
                    fom: UttaksdagenString.neste(dato).getDato(),
                    tom: periode.tom,
                },
                navnPåForeldre,
                intl,
            ),
            isUpdated,
        },
    ];
};
