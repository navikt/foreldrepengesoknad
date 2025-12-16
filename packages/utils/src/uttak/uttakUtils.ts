import dayjs from 'dayjs';

import { Periode, Tidsperiode, TidsperiodeDate, isAvslåttPeriode, isUttaksperiode } from '@navikt/fp-types';
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
