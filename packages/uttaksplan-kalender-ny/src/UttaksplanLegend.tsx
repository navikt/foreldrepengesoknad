import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { Barn, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { CalendarLabel } from '@navikt/fp-ui';

import { getFamiliehendelseKalendarLabel, getKalenderPeriodenavn } from './uttaksplanKalenderUtils';

const getCalendarLabel = (
    color: PeriodeColor,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
    switch (color) {
        case PeriodeColor.PINK:
            return getFamiliehendelseKalendarLabel(barn, intl);
        case PeriodeColor.BLUE:
        case PeriodeColor.GREEN:
        case PeriodeColor.BLUESTRIPED:
        case PeriodeColor.GREENSTRIPED:
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.LIGHTGREEN:
        case PeriodeColor.LIGHTBLUEGREEN:
        case PeriodeColor.LIGHTGREENBLUE:
        case PeriodeColor.GREENOUTLINE:
        case PeriodeColor.BLUEOUTLINE:
        case PeriodeColor.BLACK:
        case PeriodeColor.GRAY:
            return getKalenderPeriodenavn(color, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl);
        default:
            return null;
    }
};

interface Props {
    uniqueColors: PeriodeColor[];
    barn: Barn;
    navnAnnenPart: string;
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[];
    erFarEllerMedmor: boolean;
}

export const UttaksplanLegend = ({
    uniqueColors,
    barn,
    navnAnnenPart,
    unikeUtsettelseÅrsaker,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();
    return uniqueColors
        .filter((c) => c !== PeriodeColor.NONE)
        .map((color) => (
            <div key={color} style={{ paddingRight: '0.5rem', paddingBottom: '0.46rem', width: 'fit-content' }}>
                <CalendarLabel iconType={color}>
                    <BodyShort style={{ whiteSpace: 'nowrap' }}>
                        {getCalendarLabel(color, barn, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl)}
                    </BodyShort>
                </CalendarLabel>
            </div>
        ));
};
