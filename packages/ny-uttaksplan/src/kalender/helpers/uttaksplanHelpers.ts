import dayjs from 'dayjs';

import { BrukerRolleSak_fpoversikt, KontoTypeUttak_fpoversikt, SaksperiodeNy } from '@navikt/fp-types';
import { CalendarPeriodColor } from '@navikt/fp-ui';
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
export const getAnnenForelderSamtidigUttakPeriode = (
    periode: SaksperiodeNy,
    perioder: SaksperiodeNy[],
): SaksperiodeNy | undefined => {
    const { forelder } = periode;
    if (isUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter((p) => p.forelder !== forelder && isUttaksperiode(periode))
            .find((p) => dayjs(periode.fom).isSame(p.fom));

        return samtidigUttak;
    }

    return undefined;
};

export const getForelderFarge = (
    forelder: BrukerRolleSak_fpoversikt,
    erFarEllerMedmor: boolean,
): CalendarPeriodColor => {
    if (forelder === 'MOR') {
        return erFarEllerMedmor ? 'LIGHTBLUE' : 'BLUE';
    }
    return erFarEllerMedmor ? 'GREEN' : 'LIGHTGREEN';
};

const getKontoFarge = (konto: KontoTypeUttak_fpoversikt, erFarEllerMedmor: boolean): CalendarPeriodColor => {
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

export const getUttaksperiodeFarge = (
    konto: KontoTypeUttak_fpoversikt,
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
