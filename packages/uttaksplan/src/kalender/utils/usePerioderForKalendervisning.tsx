import { ExclamationmarkTriangleFillIcon, HeartFillIcon, TeddyBearFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    NavnPåForeldre,
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import {
    Tidsperioden,
    Uttaksdagen,
    Uttaksperioden,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
} from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import {
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { erAvslåttPeriode, erUttaksperiode, harPeriodeDerMorsAktivitetIkkeErValgt } from '../../utils/periodeUtils';
import { filtrerBortAnnenPartsIdentiskePerioder } from './uttaksplanKalenderUtils';

export const usePerioderForKalendervisning = (
    endredePerioder: Array<{ fom: string; tom: string }>,
    barnehagestartdato?: string,
): CalendarPeriod[] => {
    const intl = useIntl();

    const {
        barn,
        foreldreInfo: { søker, navnPåForeldre, rettighetType },
        familiehendelsedato,
    } = useUttaksplanData();

    const saksperioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const erFarEllerMedmor = søker === 'FAR_MEDMOR';

    const unikePerioder = filtrerBortAnnenPartsIdentiskePerioder(saksperioderInkludertTapteDager, erFarEllerMedmor);

    const kalenderPerioder = unikePerioder.reduce<CalendarPeriod[]>((acc, periode) => {
        const color = getKalenderFargeForPeriode(periode, erFarEllerMedmor, saksperioderInkludertTapteDager);
        const isUpdated = endredePerioder.some((p) => p.fom === periode.fom && p.tom === periode.tom);

        const perioder = lagBarnehageOgfamiliehendelsePeriode(
            intl,
            barn,
            color,
            familiehendelsedato,
            barnehagestartdato,
            periode,
        );

        if (dayjs(familiehendelsedato).isBetween(periode.fom, periode.tom, 'day', '[]')) {
            return [
                ...acc,
                ...perioder,
                ...splittPeriodeITo(
                    periode,
                    familiehendelsedato,
                    color,
                    navnPåForeldre,
                    intl,
                    isUpdated,
                    rettighetType,
                ),
            ];
        }

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                ...perioder,
                ...splittPeriodeITo(periode, barnehagestartdato, color, navnPåForeldre, intl, isUpdated, rettighetType),
            ];
        }

        return [
            ...acc,
            ...perioder,
            {
                fom: periode.fom,
                tom: periode.tom,
                color,
                srText: getKalenderSkjermlesertekstForPeriode(periode, navnPåForeldre, intl),
                isUpdated,
                ...leggTilIkonVedPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, periode),
            } satisfies CalendarPeriod,
        ];
    }, []);

    if (!unikePerioder.some((p) => Tidsperioden.forPeriode(p).inneholderDato(familiehendelsedato))) {
        kalenderPerioder.push(lagFamiliehendelseDato(familiehendelsedato, 'NONE', barn, intl));
    }
    if (
        barnehagestartdato &&
        !unikePerioder.some((p) => Tidsperioden.forPeriode(p).inneholderDato(barnehagestartdato))
    ) {
        kalenderPerioder.push(lagBarnehagedatoPeriode(barnehagestartdato, 'NONE', intl));
    }

    kalenderPerioder.sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    return kalenderPerioder;
};

const lagBarnehageOgfamiliehendelsePeriode = (
    intl: IntlShape,
    barn: Barn,
    color: CalendarPeriodColor,
    familiehendelsedato: string,
    barnehagedato?: string,
    periode?: UttaksplanperiodeMedKunTapteDager,
): CalendarPeriod[] => {
    const perioder: CalendarPeriod[] = [];
    if (barnehagedato !== undefined && (!periode || Tidsperioden.forPeriode(periode).inneholderDato(barnehagedato))) {
        perioder.push(lagBarnehagedatoPeriode(barnehagedato, color, intl));
    }

    if (!periode || Tidsperioden.forPeriode(periode).inneholderDato(familiehendelsedato)) {
        perioder.push(lagFamiliehendelseDato(familiehendelsedato, color, barn, intl));
    }

    return perioder;
};

const getKalenderFargeForPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    erFarEllerMedmor: boolean,
    allePerioder: UttaksplanperiodeMedKunTapteDager[],
): CalendarPeriodColor => {
    if (erAvslåttPeriode(periode)) {
        if (erVanligUttakPeriode(periode) && periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'DARKGRAY';
        }
        return 'BLACKOUTLINE';
    }

    const annenForelderSamtidigUttaksperiode = erUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent =
        erVanligUttakPeriode(periode) && erUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (erTapteDagerHull(periode)) {
        return 'BLACK';
    }

    if (Uttaksperioden.erEøsPeriode(periode)) {
        return erFarEllerMedmor ? 'BLUE_WITH_BLACK_OUTLINE' : 'GREEN_WITH_BLACK_OUTLINE';
    }

    if (periode.utsettelseÅrsak) {
        if (periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
            return 'BLUEOUTLINE';
        }
        return 'BEIGEOUTLINE';
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
    periode: UttaksplanperiodeMedKunTapteDager,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const periodeNavn = getKalenderSkjermleserPeriodetekst(periode, navnPåForeldre, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(periode.fom),
            tilDato: formaterDatoUtenDag(periode.tom),
        },
    );
};

const getKalenderSkjermleserPeriodetekst = (
    periode: UttaksplanperiodeMedKunTapteDager,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const navn =
        erEøsUttakPeriode(periode) || periode.forelder === 'FAR_MEDMOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    const periodenTilhører = intl.formatMessage({ id: 'kalender.srText.PeriodenTil' }, { navn });

    if (erAvslåttPeriode(periode)) {
        if (erVanligUttakPeriode(periode) && periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.avslagFratrekkPleiepenger' });
        }
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AvslåttPeriode' });
    }

    if (erTapteDagerHull(periode)) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.TapteDager' });
    }

    if (periode.kontoType) {
        switch (periode.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerFørFødsel' });
            case 'MØDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Mødrekvote' });
            case 'FEDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fedrekvote' });
            case 'FELLESPERIODE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fellesperiode' });
            case 'FORELDREPENGER':
                return finnSkjermleserTekstForKvoteForeldrepenger(periode, periodenTilhører, intl);
            default:
                return assertUnreachable('Error: ukjent kontoType i getKalenderSkjermleserPeriodetekst');
        }
    }

    if (periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.LovbestemtFerie' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Utsettelse' });
};

const finnSkjermleserTekstForKvoteForeldrepenger = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    periodenTilhører: string,
    intl: IntlShape,
): string => {
    if (Uttaksperioden.erEøsPeriode(periode)) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
    }

    if (periode.morsAktivitet === 'IKKE_OPPGITT') {
        if (periode.gradering?.arbeidstidprosent) {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieDelGradert' });
        }

        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieIkkeGradert' });
    }

    if (periode.samtidigUttak && periode.samtidigUttak > 0) {
        return intl.formatMessage({ id: 'kalender.srText.SamtidigUttaksperiode' });
    }

    if (periode.gradering?.arbeidstidprosent) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerGradert' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
};

const getAnnenForelderSamtidigUttakPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    perioder: UttaksplanperiodeMedKunTapteDager[],
): UttaksplanperiodeMedKunTapteDager | undefined => {
    if (erUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter(
                (p) =>
                    erVanligUttakPeriode(p) &&
                    erVanligUttakPeriode(periode) &&
                    p.forelder !== periode.forelder &&
                    !!p.samtidigUttak &&
                    !!periode.samtidigUttak,
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
    rettighetType: RettighetType_fpoversikt,
): CalendarPeriod[] => {
    const forrige = Uttaksdagen.forrige(dato).getDato();
    const neste = Uttaksdagen.neste(dato).getDato();
    const ikonProps = leggTilIkonVedPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, periode);

    const lagPeriode = (fom: string, tom: string): CalendarPeriod => ({
        fom,
        tom,
        color,
        srText: getKalenderSkjermlesertekstForPeriode({ ...periode, fom, tom }, navnPåForeldre, intl),
        isUpdated,
        ...ikonProps,
    });

    if (dato === periode.fom) {
        return [lagPeriode(neste, periode.tom)];
    }

    if (dato === periode.tom) {
        return [lagPeriode(periode.fom, forrige)];
    }

    return [lagPeriode(periode.fom, forrige), lagPeriode(neste, periode.tom)];
};

const leggTilIkonVedPeriodeDerMorsAktivitetIkkeErValgt = (
    rettighetType: RettighetType_fpoversikt,
    periode: UttaksplanperiodeMedKunTapteDager,
) => {
    if (harPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, [periode])) {
        return {
            icon: <ExclamationmarkTriangleFillIcon aria-hidden color="var(--ax-warning-600)" />,
            iconFull: false,
        };
    }
    return {};
};

const lagFamiliehendelseDato = (
    familiehendelsedato: string,
    color: CalendarPeriodColor,
    barn: Barn,
    intl: IntlShape,
): CalendarPeriod => {
    return {
        fom: familiehendelsedato,
        tom: familiehendelsedato,
        color,
        srText: getSkjermlesertekstForFamiliehendelse(barn, intl),
        icon: <HeartFillIcon aria-hidden color="var(--ax-bg-brand-magenta-strong)" width={25} height={25} />,
        iconFull: true,
    };
};

const lagBarnehagedatoPeriode = (
    barnehagedato: string,
    color: CalendarPeriodColor,
    intl: IntlShape,
): CalendarPeriod => {
    return {
        fom: barnehagedato,
        tom: barnehagedato,
        color,
        srText: intl.formatMessage({ id: 'kalender.barnehageplass' }),
        icon: <TeddyBearFillIcon aria-hidden color="var(--ax-brand-beige-800)" width={25} height={25} />,
        iconFull: true,
    };
};
