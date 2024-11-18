import dayjs from 'dayjs';

import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy } from '@navikt/fp-types';
import { slutterTidsperiodeInnen6UkerEtterFødsel } from '@navikt/fp-utils';

//TODO (TOR) Desse er kopiert fra pakka ny-uttaksplan. Bør ein bruke dei direkte i den pakka, eller
// bør det flyttast ut til ny pakke? Her har ein kun behov for SaksperiodeNy

export const isUttaksperiode = (periode: SaksperiodeNy) => {
    return periode.kontoType !== undefined && periode.utsettelseÅrsak === undefined;
};

export const isAvslåttPeriode = (periode: SaksperiodeNy) => {
    return periode.resultat && periode.resultat.innvilget !== true;
};

export const isAvslåttPeriodeFørsteSeksUkerMor = (periode: SaksperiodeNy, familiehendelsesdato: string): boolean => {
    return (
        !!isAvslåttPeriode(periode) &&
        periode.forelder === 'MOR' &&
        dayjs(periode.fom).isSameOrAfter(dayjs(familiehendelsesdato), 'day') &&
        slutterTidsperiodeInnen6UkerEtterFødsel({ fom: periode.fom, tom: periode.tom }, new Date(familiehendelsesdato))
    );
};

export const getIndexOfSistePeriodeFørDato = (uttaksplan: SaksperiodeNy[], dato: string | undefined) => {
    if (dato !== undefined) {
        return Math.max(0, uttaksplan.filter((p) => dayjs(p.tom).isBefore(dato, 'day')).length);
    }
    return undefined;
};

export const isForeldrepengerFørFødselUttaksperiode = (periode: SaksperiodeNy) => {
    return isUttaksperiode(periode) && periode.kontoType === StønadskontoType.ForeldrepengerFørFødsel;
};

export const getAnnenForelderSamtidigUttakPeriode = (
    periode: SaksperiodeNy,
    perioder: SaksperiodeNy[],
): SaksperiodeNy | undefined => {
    const { forelder } = periode;
    if (isUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter((p) => p.forelder !== forelder && isUttaksperiode(periode))
            .find((p) => dayjs(periode.fom).isSame(p.fom));

        return samtidigUttak !== undefined ? samtidigUttak : undefined;
    }

    return undefined;
};
