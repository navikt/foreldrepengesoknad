import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, getNavnGenitivEierform } from '@navikt/fp-utils';

import { LegendLabel } from '../../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../../types/UttaksplanKalenderLegendInfo';

export const sortLegendInfoByLabel = (a: UttaksplanKalenderLegendInfo, b: UttaksplanKalenderLegendInfo): number => {
    const labelOrder: LegendLabel[] = [
        'MORS_DEL',
        'MORS_DEL_GRADERT',
        'FARS_DEL',
        'FARS_DEL_GRADERT',
        'FARS_DEL_AKTIVITETSFRI',
        'FARS_DEL_AKTIVITETSFRI_GRADERT',
        'SAMTIDIG_UTTAK',
        'UTSETTELSE',
        'TAPTE_DAGER',
        'TERMIN',
        'FØDSEL',
        'ADOPSJON',
        'BARNEHAGEPLASS',
        'HELG',
    ];

    const indexA = labelOrder.indexOf(a.label);
    const indexB = labelOrder.indexOf(b.label);

    return indexA - indexB;
};

export const getSelectableStyle = (selectable: boolean) => {
    return selectable ? 'cursor-pointer ' : '';
};

export const getSelectedStyle = (isSelected: boolean, color: CalendarPeriodColor) => {
    if (isSelected) {
        if (color === 'GREEN' || color === 'GREENSTRIPED' || color === 'LIGHTGREEN' || color === 'LIGHTGREENBLUE') {
            return 'outline-2 outline-offset-4 outline-ax-success-600';
        }
        if (color === 'BLUE' || color === 'BLUESTRIPED' || color === 'LIGHTBLUE' || color === 'LIGHTBLUEGREEN') {
            return 'outline-2 outline-offset-4 outline-ax-accent-600';
        }
        if (color === 'BLUEOUTLINE') {
            return 'outline-2 outline-offset-4 outline-ax-accent-500';
        }
        if (color === 'BLACK') {
            return 'outline-2 outline-offset-4 outline-ax-bg-neutral-strong';
        }

        if (color !== 'PINK' && color !== 'PURPLE' && color !== 'BLACKOUTLINE' && color !== 'GRAY') {
            return 'outline-2 outline-offset-4 outline-ax-success-600';
        }
    }

    return '';
};

export const getFocusStyle = (color: CalendarPeriodColor) => {
    if (color === 'GREEN' || color === 'GREENSTRIPED' || color === 'LIGHTGREEN' || color === 'LIGHTGREENBLUE') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-success-600';
    }
    if (color === 'BLUE' || color === 'BLUESTRIPED' || color === 'LIGHTBLUE' || color === 'LIGHTBLUEGREEN') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-accent-600';
    }
    if (color === 'BLUEOUTLINE') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-accent-500';
    }
    if (color === 'BLACK') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-bg-neutral-strong';
    }

    if (color !== 'PINK' && color !== 'PURPLE' && color !== 'BLACKOUTLINE' && color !== 'GRAY') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-success-600';
    }

    return '';
};

export const getCalendarLabel = (
    label: LegendLabel,
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erIPlanleggerModus: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    switch (label) {
        case 'HELG':
            return intl.formatMessage({ id: 'kalender.helg' });
        case 'UTSETTELSE':
            return intl.formatMessage({ id: 'kalender.utsettelse' });
        case 'TERMIN':
            return intl.formatMessage({ id: 'kalender.termin' });
        case 'FØDSEL':
            return intl.formatMessage({ id: 'kalender.fødsel' });
        case 'ADOPSJON':
            return intl.formatMessage({ id: 'kalender.adopsjon' });
        case 'BARNEHAGEPLASS':
            return intl.formatMessage({ id: 'kalender.barnehageplass' });
        case 'MORS_DEL':
            return getMorsDelLabel(navnAnnenPart, erFarEllerMedmor, erIPlanleggerModus, erDeltUttak, intl);
        case 'MORS_DEL_GRADERT':
            return getMorsDelGradertLabel(navnAnnenPart, erFarEllerMedmor, erIPlanleggerModus, intl);
        case 'FARS_DEL':
            return getFarsDelLabel(
                navnAnnenPart,
                erFarEllerMedmor,
                erIPlanleggerModus,
                erDeltUttak,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            );
        case 'FARS_DEL_GRADERT':
            return getFarsDelGradertLabel(
                navnAnnenPart,
                erFarEllerMedmor,
                erIPlanleggerModus,
                erDeltUttak,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            );
        case 'FARS_DEL_AKTIVITETSFRI':
            return intl.formatMessage({ id: 'kalender.dinPeriode.aktivitetsfri' });
        case 'FARS_DEL_AKTIVITETSFRI_GRADERT':
            return intl.formatMessage({ id: 'kalender.dinPeriode.aktivitetsfri.gradert' });
        case 'TAPTE_DAGER':
            return erIPlanleggerModus
                ? intl.formatMessage({ id: 'kalender.tapteDager.planlegger' })
                : intl.formatMessage({ id: 'kalender.tapteDager' });
        case 'SAMTIDIG_UTTAK':
            return erIPlanleggerModus
                ? intl.formatMessage({ id: 'kalender.samtidigUttak.planlegger' })
                : intl.formatMessage({ id: 'kalender.samtidigUttak' }, { navnAnnenPart });
        default:
            return label;
    }
};

const getMorsDelLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erIPlanleggerModus: boolean,
    erDeltUttak: boolean,
    intl: IntlShape,
): string => {
    if (erIPlanleggerModus && erDeltUttak) {
        return intl.formatMessage({ id: 'kalender.morsPeriode' });
    }

    return erFarEllerMedmor
        ? intl.formatMessage(
              { id: 'kalender.annenPartPeriode' },
              { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
          )
        : intl.formatMessage({ id: 'kalender.dinPeriode' });
};

const getMorsDelGradertLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erIPlanleggerModus: boolean,
    intl: IntlShape,
): string => {
    if (erIPlanleggerModus) {
        return intl.formatMessage({ id: 'kalender.morsPeriode.gradert' });
    }

    return erFarEllerMedmor
        ? intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart })
        : intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
};

const getFarsDelLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erIPlanleggerModus: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erIPlanleggerModus && erDeltUttak) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode' });
        }

        return intl.formatMessage({ id: 'kalender.farsPeriode' });
    }

    if (harAktivitetsfriKvote) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav' });
    }

    return erFarEllerMedmor
        ? intl.formatMessage({ id: 'kalender.dinPeriode' })
        : intl.formatMessage(
              { id: 'kalender.annenPartPeriode' },
              { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
          );
};

const getFarsDelGradertLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erIPlanleggerModus: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erIPlanleggerModus && erDeltUttak) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode.gradert' });
        }

        return intl.formatMessage({ id: 'kalender.farsPeriode.gradert' });
    }

    if (harAktivitetsfriKvote) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav.gradert' });
    }

    return erFarEllerMedmor
        ? intl.formatMessage({ id: 'kalender.dinPeriode.gradert' })
        : intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
};

export const getInneholderKalenderHelgedager = (periods: CalendarPeriod[]): boolean => {
    if (periods.length === 0) {
        return false;
    }

    const førsteDag = periods[0]!.fom;
    const sisteDag = periods.at(-1)!.tom;
    if (dayjs(sisteDag).diff(dayjs(førsteDag), 'days') > 5) {
        return true;
    }
    const førsteDagNr = dayjs(førsteDag).get('day');
    const sisteDagNr = dayjs(sisteDag).get('day');
    return sisteDagNr < førsteDagNr;
};
