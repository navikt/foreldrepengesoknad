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

    const unselectableColors = ['PINK', 'PURPLE', 'BLACKOUTLINE'] satisfies CalendarPeriodColor[];

    const selectableLegends = legendInfo.filter((info) => !unselectableColors.some((color) => color === info.color));
    const nonSelectableLegends = legendInfo.filter((info) => unselectableColors.some((color) => color === info.color));
    const sortedLegends = [...selectableLegends, ...nonSelectableLegends];

    return (
        <HStack gap="space-16" align="center">
            {sortedLegends
                .filter((info) => info.color !== 'NONE')
                .map((info) => (
                    <button
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
                        type="button"
                        className={'inline-block w-fit pb-[0.46rem] pr-2 [all:unset]'}
                    >
                        <CalendarLabel color={info.color} selected={selectedLabel === info.label}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                {getCalendarLabel(info.label, navnAnnenPart, erFarEllerMedmor, intl)}
                            </BodyShort>
                        </CalendarLabel>
                    </button>
                ))}
        </HStack>
    );
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
