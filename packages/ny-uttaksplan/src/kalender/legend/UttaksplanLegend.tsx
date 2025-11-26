import { useState } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';

import { LegendLabel } from '../../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../../types/UttaksplanKalenderLegendInfo';
import { CalendarPeriodWithLabel } from '../utils/usePerioderForKalendervisning.ts';
import { useUttaksplanData } from './../../context/UttaksplanDataContext.tsx';
import {
    getCalendarLabel,
    getFocusStyle,
    getInneholderKalenderHelgedager,
    getSelectableStyle,
    getSelectedStyle,
    sortLegendInfoByLabel,
} from './uttaksplanLegendUtils.ts';

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
    const { modus, erDeltUttak, erMedmorDelAvSøknaden } = useUttaksplanData();

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

    const unselectableColors = ['PINK', 'PURPLE', 'BLACKOUTLINE', 'GRAY'] as CalendarPeriodColor[];

    const sortedLegends = [...legendInfo.sort(sortLegendInfoByLabel)];

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
                        className={
                            `rounded-sm ${getSelectableStyle(!unselectableColors.includes(info.color) && !readOnly)}` +
                            ` ${getFocusStyle(info.color)} ${getSelectedStyle(selectedLabel === info.label, info.color)} `
                        }
                        tabIndex={!unselectableColors.includes(info.color) && !readOnly ? 0 : -1}
                    >
                        <CalendarLabel color={info.color}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                {getCalendarLabel(
                                    info.label,
                                    navnAnnenPart,
                                    erFarEllerMedmor,
                                    modus === 'planlegger',
                                    erDeltUttak,
                                    erMedmorDelAvSøknaden,
                                    intl,
                                )}
                            </BodyShort>
                        </CalendarLabel>
                    </button>
                ))}
        </HStack>
    );
};
