import dayjs from 'dayjs';

import { Forelder, PeriodeColor } from '@navikt/fp-constants';
import {
    KontoTypeUttak,
    Oppholdsperiode,
    Periode,
    Tidsperiode,
    TidsperiodeDate,
    isAvslåttPeriode,
    isUttaksperiode,
} from '@navikt/fp-types';
import { isUttakAnnenPart } from '@navikt/fp-types/src/Periode';

import { Uttaksdagen } from './Uttaksdagen';

const ANTALL_DAGER_SEKS_UKER = 6 * 7;

export const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: Date): Date => {
    const førsteUttaksdagForPeriodeEtterFødsel = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    return Uttaksdagen(
        dayjs(førsteUttaksdagForPeriodeEtterFødsel).add(ANTALL_DAGER_SEKS_UKER, 'day').toDate(),
    ).forrige();
};

export const slutterTidsperiodeInnen6UkerEtterFødsel = (
    tidsperiode: TidsperiodeDate | Tidsperiode,
    familiehendelsesdato: Date,
): boolean => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    return dayjs(tidsperiode.tom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day');
};

export const isAvslåttPeriodeFørsteSeksUkerMor = (periode: Periode, familiehendelsesdato: string): boolean => {
    return (
        isAvslåttPeriode(periode) &&
        periode.forelder === 'MOR' &&
        dayjs(periode.tidsperiode.fom).isSameOrAfter(dayjs(familiehendelsesdato), 'day') &&
        slutterTidsperiodeInnen6UkerEtterFødsel(periode.tidsperiode, new Date(familiehendelsesdato))
    );
};

export const getIndexOfSistePeriodeFørDato = (uttaksplan: Periode[], dato: string | undefined) => {
    if (dato !== undefined) {
        return Math.max(0, uttaksplan.filter((p) => dayjs(p.tidsperiode.tom).isBefore(dato, 'day')).length);
    }
    return undefined;
};

export const getAnnenForelderSamtidigUttakPeriode = (periode: Periode, perioder: Periode[]): Periode | undefined => {
    if (isUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter((p) => isUttakAnnenPart(p))
            .find(
                (p) =>
                    isUttakAnnenPart(p) &&
                    dayjs(periode.tidsperiode.fom).isSame(p.tidsperiode.fom) &&
                    p.ønskerSamtidigUttak === true &&
                    p.id !== periode.id,
            );

        return samtidigUttak;
    }

    return undefined;
};

export const getForelderFarge = (forelder: Forelder, erFarEllerMedmor: boolean): PeriodeColor => {
    if (forelder === Forelder.mor) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUE : PeriodeColor.BLUE;
    }
    return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.LIGHTGREEN;
};

export const getKontoFarge = (konto: KontoTypeUttak, erFarEllerMedmor: boolean): PeriodeColor => {
    switch (konto) {
        case 'FEDREKVOTE':
        case 'AKTIVITETSFRI_KVOTE':
            return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.LIGHTGREEN;
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return erFarEllerMedmor ? PeriodeColor.LIGHTBLUE : PeriodeColor.BLUE;
        case 'FORELDREPENGER':
            return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.BLUE;
        case 'FELLESPERIODE':
            return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
        default:
            return PeriodeColor.NONE;
    }
};

export const getUttaksperiodeFarge = (
    konto: KontoTypeUttak,
    forelder: Forelder | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): PeriodeColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.BLUE;
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

export const getUtsettelseFarge = (forelder: Forelder): PeriodeColor => {
    return forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
};

export const getOppholdFarge = (periode: Oppholdsperiode, erFarEllerMedmor: boolean): PeriodeColor => {
    return getForelderFarge(periode.forelder, erFarEllerMedmor);
};
