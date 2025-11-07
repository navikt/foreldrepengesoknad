import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { Barn, LegendLabel, UttakUtsettelseÅrsak_fpoversikt, UttaksplanKalenderLegendInfo } from '@navikt/fp-types';
import { CalendarLabel } from '@navikt/fp-ui';

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
        // case PeriodeColor.PINK:
        //     return getFamiliehendelseKalendarLabel(barn, intl);
        // case PeriodeColor.BLUE:
        // case PeriodeColor.GREEN:
        // case PeriodeColor.BLUESTRIPED:
        // case PeriodeColor.GREENSTRIPED:
        // case PeriodeColor.LIGHTBLUE:
        // case PeriodeColor.LIGHTGREEN:
        // case PeriodeColor.LIGHTBLUEGREEN:
        // case PeriodeColor.LIGHTGREENBLUE:
        // case PeriodeColor.GREENOUTLINE:
        // case PeriodeColor.BLUEOUTLINE:
        // case PeriodeColor.BLACK:
        // case PeriodeColor.GRAY:
        // case PeriodeColor.BLACKOUTLINE:
        //     return getKalenderPeriodenavn(color, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl);
        // case PeriodeColor.PURPLE:
        //     return 'Barnehageplass';
        // default:
        //     return null;
    }
};

interface Props {
    uniqueColors: PeriodeColor[];
    barn: Barn;
    navnAnnenPart: string;
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[];
    erFarEllerMedmor: boolean;
    selectLegend: (color: PeriodeColor) => void;
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
                .filter((info) => info.color !== PeriodeColor.NONE)
                .map((info) => (
                    <button
                        key={info.color}
                        onClick={
                            info.color !== PeriodeColor.PINK &&
                            info.color !== PeriodeColor.PURPLE &&
                            info.color !== PeriodeColor.BLACKOUTLINE
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
