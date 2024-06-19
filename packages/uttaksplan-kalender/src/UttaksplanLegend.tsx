import { FunctionComponent, ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor, UtsettelseÅrsakType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';
import { CalendarLabel } from '@navikt/fp-ui';

import { getFamiliehendelseKalendarLabel, getKalenderPeriodenavn } from './uttaksplanKalenderUtils';

const getCalendarLabel = (
    color: PeriodeColor,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
    switch (color) {
        case PeriodeColor.PINK:
            return <BodyShort>{getFamiliehendelseKalendarLabel(barn, intl)}</BodyShort>;
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
    uniqueColors: PeriodeColor[];
    barn: Barn;
    navnAnnenPart: string;
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[];
    erFarEllerMedmor: boolean;
}

const UttaksplanLegend: FunctionComponent<Props> = ({
    uniqueColors,
    barn,
    navnAnnenPart,
    unikeUtsettelseÅrsaker,
    erFarEllerMedmor,
}) => {
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

export default UttaksplanLegend;
