import { IntlShape } from 'react-intl';

import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, getNavnGenitivEierform } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { LegendLabel } from '../../types/LegendLabel';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';

export type UttaksplanKalenderLegendInfo = {
    calendarPeriod: CalendarPeriod;
    label: LegendLabel;
    forelder?: 'MOR' | 'FAR_MEDMOR';
};

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
    info: UttaksplanKalenderLegendInfo,
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    const erSøkerMorOgHennesPeriode = !erFarEllerMedmor && info.forelder === 'MOR';
    const erSøkerFarOgHansPeriode = erFarEllerMedmor && info.forelder === 'FAR_MEDMOR';
    const erSøkersPeriode = erSøkerMorOgHennesPeriode || erSøkerFarOgHansPeriode;
    switch (info.label) {
        case 'HELG':
            return intl.formatMessage({ id: 'kalender.helg' });
        case 'UTSETTELSE':
            return intl.formatMessage(
                { id: 'kalender.utsettelse' },
                {
                    erSokersPeriode: erSøkersPeriode,
                    navnAnnenPart,
                },
            );
        case 'TERMIN':
            return intl.formatMessage({ id: 'kalender.termin' });
        case 'FØDSEL':
            return intl.formatMessage({ id: 'kalender.fødsel' });
        case 'ADOPSJON':
            return intl.formatMessage({ id: 'kalender.adopsjon' });
        case 'BARNEHAGEPLASS':
            return intl.formatMessage({ id: 'kalender.barnehageplass' });
        case 'MORS_DEL':
            return getMorsDelLabel(navnAnnenPart, erSøkersPeriode, intl);
        case 'MORS_DEL_GRADERT':
            return getMorsDelGradertLabel(navnAnnenPart, erSøkersPeriode, intl);
        case 'FARS_DEL':
            return getFarsDelLabel(
                navnAnnenPart,
                erFarEllerMedmor,
                erSøkerFarOgHansPeriode,
                erDeltUttak,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            );
        case 'FARS_DEL_GRADERT':
            return getFarsDelGradertLabel(
                navnAnnenPart,
                erFarEllerMedmor,
                erSøkerFarOgHansPeriode,
                erDeltUttak,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            );
        case 'FARS_DEL_AKTIVITETSFRI':
            return intl.formatMessage(
                { id: 'kalender.dinPeriode.aktivitetsfri' },
                {
                    erSokersPeriode: erSøkersPeriode,
                    navnAnnenPart,
                },
            );
        case 'FARS_DEL_AKTIVITETSFRI_GRADERT':
            return intl.formatMessage(
                { id: 'kalender.dinPeriode.aktivitetsfri.gradert' },
                {
                    erSokersPeriode: erSøkersPeriode,
                    navnAnnenPart,
                },
            );
        case 'AVSLAG_FRATREKK_PLEIEPENGER':
            return intl.formatMessage({ id: 'kalender.avslagFratrekkPleiepenger' });
        case 'TAPTE_DAGER':
            return intl.formatMessage(
                { id: 'kalender.tapteDager' },
                {
                    erSokersPeriode: erSøkersPeriode,
                    navnAnnenPart,
                },
            );
        case 'SAMTIDIG_UTTAK':
            return erFarEllerMedmor
                ? intl.formatMessage({ id: 'kalender.samtidigUttak.planlegger' })
                : intl.formatMessage({ id: 'kalender.samtidigUttak' }, { navnAnnenPart });
        default:
            return info.label;
    }
};

const getMorsDelLabel = (navnAnnenPart: string, erSøkersPeriode: boolean, intl: IntlShape): string => {
    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getMorsDelGradertLabel = (navnAnnenPart: string, erSøkersPeriode: boolean, intl: IntlShape): string => {
    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
    }

    return intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
};

const getFarsDelLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erSøkerFarOgHansPeriode: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erSøkerFarOgHansPeriode) {
        if (harAktivitetsfriKvote) {
            return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav' });
        }
        return intl.formatMessage({ id: 'kalender.dinPeriode' });
    }

    if (erFarEllerMedmor && erDeltUttak) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode' });
        }

        return intl.formatMessage({ id: 'kalender.farsPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getFarsDelGradertLabel = (
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    erSøkerFarOgHansPeriode: boolean,
    erDeltUttak: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erSøkerFarOgHansPeriode) {
        if (harAktivitetsfriKvote) {
            return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav.gradert' });
        }
        return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
    }

    if (erFarEllerMedmor && erDeltUttak) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode.gradert' });
        }

        return intl.formatMessage({ id: 'kalender.farsPeriode.gradert' });
    }

    return erFarEllerMedmor
        ? intl.formatMessage({ id: 'kalender.dinPeriode.gradert' })
        : intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
};

export const getLegendLabelFromPeriode = (p: Planperiode): LegendLabel | undefined => {
    if (p.kontoType) {
        switch (p.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return 'MORS_DEL';
            case 'MØDREKVOTE':
            case 'FEDREKVOTE':
            case 'FELLESPERIODE':
            case 'FORELDREPENGER':
                if (!p.erAnnenPartEøs && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
                    return 'AVSLAG_FRATREKK_PLEIEPENGER';
                }

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
            return undefined;
        }

        if (p.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
            return 'TAPTE_DAGER';
        }
    }

    return 'UTSETTELSE';
};
