import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { CalendarLabel, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, getNavnGenitivEierform } from '@navikt/fp-utils';

import { LegendLabel } from '../../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../../types/UttaksplanKalenderLegendInfo';
import { CalendarPeriodWithLabel } from '../utils/usePerioderForKalendervisning.ts';

interface Props {
    perioderForKalendervisning: CalendarPeriodWithLabel[];
    navnAnnenPart: string;
    erFarEllerMedmor: boolean;
    selectLegend: (color: CalendarPeriodColor) => void;
    readOnly: boolean;
}

export const UttaksplanLegend = ({
    perioderForKalendervisning,
    navnAnnenPart,
    erFarEllerMedmor,
    selectLegend,
    readOnly,
}: Props) => {
    const intl = useIntl();

    const [selectedLabel, setSelectedLabel] = useState<LegendLabel | undefined>(undefined);

    const inkludererHelg = getInneholderKalenderHelgedager(perioderForKalendervisning);
    const unikeLegendLabels = [...new Set(perioderForKalendervisning.map((period) => period.legendLabel))];
    const unikeLegendColors = [...new Set(perioderForKalendervisning.map((period) => period.color))];

    const legendInfo: UttaksplanKalenderLegendInfo[] = unikeLegendColors.map((color) => ({
        color,
        label:
            unikeLegendLabels.find((label) => {
                return perioderForKalendervisning.some((p) => p.color === color && p.legendLabel === label);
            }) ?? 'NO_LABEL',
    }));

    if (inkludererHelg) {
        legendInfo.push({
            color: 'GRAY',
            label: 'HELG',
        });
    }

    const unselectableColors = ['PINK', 'PURPLE', 'BLACKOUTLINE', 'GRAY'] satisfies CalendarPeriodColor[];

    const selectableLegends = legendInfo.filter((info) => !unselectableColors.some((color) => color === info.color));
    const nonSelectableLegends = legendInfo.filter((info) => unselectableColors.some((color) => color === info.color));
    const sortedLegends = [...selectableLegends, ...nonSelectableLegends];

    return (
        <HStack gap="space-16" align="center">
            {sortedLegends
                .filter((info) => info.color !== 'NONE')
                .map((info) => (
                    <div
                        key={info.color}
                        onClick={
                            unselectableColors.some((color) => color === info.color) || readOnly
                                ? undefined
                                : () => {
                                      selectLegend(info.color);

                                      if (selectedLabel === info.label) {
                                          setSelectedLabel(undefined);
                                      } else {
                                          setSelectedLabel(info.label);
                                      }
                                  }
                        }
                        className={
                            `rounded-sm ${getSelectableStyle(!unselectableColors.some((color) => color === info.color) && !readOnly)}` +
                            ` ${getFocusStyle(info.color)} ${getSelectedStyle(selectedLabel === info.label, info.color)} `
                        }
                        onKeyDown={(keyEvent) => {
                            if (keyEvent.code === 'Space' || keyEvent.code === 'Enter') {
                                keyEvent.preventDefault();

                                if (unselectableColors.some((color) => color === info.color) || readOnly) {
                                    return;
                                } else {
                                    selectLegend(info.color);

                                    if (selectedLabel === info.label) {
                                        setSelectedLabel(undefined);
                                    } else {
                                        setSelectedLabel(info.label);
                                    }
                                }
                            }
                        }}
                        role="button"
                        tabIndex={unselectableColors.some((color) => color === info.color) || readOnly ? -1 : 0}
                    >
                        <CalendarLabel color={info.color} selected={selectedLabel === info.label}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                {getCalendarLabel(info.label, navnAnnenPart, erFarEllerMedmor, intl)}
                            </BodyShort>
                        </CalendarLabel>
                    </div>
                ))}
        </HStack>
    );
};

const getSelectableStyle = (selectable: boolean) => {
    return selectable ? 'cursor-pointer ' : '';
};

const getSelectedStyle = (isSelected: boolean, color: CalendarPeriodColor) => {
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

const getFocusStyle = (color: CalendarPeriodColor) => {
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

const getCalendarLabel = (
    label: LegendLabel,
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
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
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.annenPartPeriode' },
                      { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
                  )
                : intl.formatMessage({ id: 'kalender.dinPeriode' });
        case 'MORS_DEL_GRADERT':
            return erFarEllerMedmor
                ? intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart })
                : intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
        case 'FARS_DEL':
            return erFarEllerMedmor
                ? intl.formatMessage({ id: 'kalender.dinPeriode' })
                : intl.formatMessage(
                      { id: 'kalender.annenPartPeriode' },
                      { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
                  );
        case 'FARS_DEL_GRADERT':
            return erFarEllerMedmor
                ? intl.formatMessage({ id: 'kalender.dinPeriode.gradert' })
                : intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
        case 'FARS_DEL_AKTIVITETSFRI':
            return intl.formatMessage({ id: 'kalender.dinPeriode.aktivitetsfri' });
        case 'FARS_DEL_AKTIVITETSFRI_GRADERT':
            return intl.formatMessage({ id: 'kalender.dinPeriode.aktivitetsfri.gradert' });
        case 'TAPTE_DAGER':
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        case 'SAMTIDIG_UTTAK':
            return intl.formatMessage({ id: 'kalender.samtidigUttak' }, { navnAnnenPart });
        default:
            return label;
    }
};

const getInneholderKalenderHelgedager = (periods: CalendarPeriod[]): boolean => {
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
