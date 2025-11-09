import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { Barn, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';

import { LegendLabel } from '../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../types/UttaksplanKalenderLegendInfo';

const getCalendarLabel = (
    label: LegendLabel,
    _navnAnnenPart: string,
    _unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[],
    _erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
    switch (label) {
        case 'HELG':
            return intl.formatMessage({ id: 'kalender.helg' });
        case 'FERIE':
            return intl.formatMessage({ id: 'kalender.ferie' });
        case 'TERMIN':
            return intl.formatMessage({ id: 'kalender.termin' });
        case 'FØDSEL':
            return intl.formatMessage({ id: 'kalender.fødsel' });
        case 'ADOPSJON':
            return intl.formatMessage({ id: 'kalender.adopsjon' });
        case 'BARNEHAGEPLASS':
            return intl.formatMessage({ id: 'kalender.barnehageplass' });
        default:
            return label;
        // case CalendarPeriodColor.PINK:
        //     return getFamiliehendelseKalendarLabel(barn, intl);
        // case CalendarPeriodColor.BLUE:
        // case CalendarPeriodColor.GREEN:
        // case CalendarPeriodColor.BLUESTRIPED:
        // case CalendarPeriodColor.GREENSTRIPED:
        // case CalendarPeriodColor.LIGHTBLUE:
        // case CalendarPeriodColor.LIGHTGREEN:
        // case CalendarPeriodColor.LIGHTBLUEGREEN:
        // case CalendarPeriodColor.LIGHTGREENBLUE:
        // case CalendarPeriodColor.GREENOUTLINE:
        // case CalendarPeriodColor.BLUEOUTLINE:
        // case CalendarPeriodColor.BLACK:
        // case CalendarPeriodColor.GRAY:
        // case CalendarPeriodColor.BLACKOUTLINE:
        //     return getKalenderPeriodenavn(color, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl);
        // case CalendarPeriodColor.PURPLE:
        //     return 'Barnehageplass';
        // default:
        //     return null;
    }
};

interface Props {
    uniqueColors: CalendarPeriodColor[];
    barn: Barn;
    navnAnnenPart: string;
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[];
    erFarEllerMedmor: boolean;
    selectLegend: (color: CalendarPeriodColor) => void;
    legendInfo: UttaksplanKalenderLegendInfo[];
}

export const UttaksplanLegend = ({
    navnAnnenPart,
    unikeUtsettelseÅrsaker,
    erFarEllerMedmor,
    selectLegend,
    legendInfo,
}: Props) => {
    const intl = useIntl();

    return (
        <HStack gap="space-16" align="center">
            {legendInfo
                .filter((info) => info.color !== 'NONE')
                .map((info) => (
                    <button
                        key={info.color}
                        onClick={
                            info.color !== 'PINK' && info.color !== 'PURPLE' && info.color !== 'BLACKOUTLINE'
                                ? () => selectLegend(info.color)
                                : undefined
                        }
                        type="button"
                        className="inline-block w-fit cursor-pointer pb-[0.46rem] pr-2 [all:unset]"
                    >
                        <CalendarLabel color={info.color}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                {getCalendarLabel(
                                    info.label,
                                    navnAnnenPart,
                                    unikeUtsettelseÅrsaker,
                                    erFarEllerMedmor,
                                    intl,
                                )}
                            </BodyShort>
                        </CalendarLabel>
                    </button>
                ))}
        </HStack>
    );
};
