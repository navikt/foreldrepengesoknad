import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { UtsettelsesÅrsak } from '@navikt/fp-types';
import { CalendarLabel, type CalendarPeriodColor } from '@navikt/fp-ui';

import { getKalenderPeriodenavn } from './uttaksplanKalenderUtils';

const getCalendarLabel = (
    color: CalendarPeriodColor,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelsesÅrsak[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
    switch (color) {
        case 'BLUE':
        case 'GREEN':
        case 'BLUESTRIPED':
        case 'GREENSTRIPED':
        case 'LIGHTBLUE':
        case 'LIGHTGREEN':
        case 'LIGHTBLUEGREEN':
        case 'LIGHTGREENBLUE':
        case 'GREENOUTLINE':
        case 'BLUEOUTLINE':
        case 'BLACK':
        case 'GRAY':
            return (
                <BodyShort>
                    {getKalenderPeriodenavn(color, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl)}
                </BodyShort>
            );
        default:
            return null;
    }
};

interface Props {
    uniqueColors: CalendarPeriodColor[];
    navnAnnenPart: string;
    unikeUtsettelseÅrsaker: UtsettelsesÅrsak[];
    erFarEllerMedmor: boolean;
}

export const UttaksplanLegend = ({ uniqueColors, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor }: Props) => {
    const intl = useIntl();
    return uniqueColors
        .filter((c) => c !== 'NONE')
        .map((color) => (
            <div key={color} style={{ paddingRight: '0.5rem', paddingBottom: '0.46rem', width: 'fit-content' }}>
                <CalendarLabel color={color}>
                    <BodyShort style={{ whiteSpace: 'nowrap' }}>
                        {getCalendarLabel(color, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl)}
                    </BodyShort>
                </CalendarLabel>
            </div>
        ));
};
