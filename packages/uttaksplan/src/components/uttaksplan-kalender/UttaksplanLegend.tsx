import { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Barn, UtsettelseÅrsakType, getNavnGenitivEierform, intlUtils } from '@navikt/fp-common';
import { PeriodeColor } from '@navikt/fp-constants';
import { CalendarLabel } from '@navikt/fp-ui';

import { getFamiliehendelseTekst } from './../familiehendelsedato-display/FamiliehendelsedatoDisplay';

const getUtsettelseLabel = (unikeUtsettelseÅrsaker: UtsettelseÅrsakType[], intl: IntlShape): ReactNode => {
    if (unikeUtsettelseÅrsaker.length === 1) {
        const årsakTekst = intlUtils(intl, `kalender.utsettelse.${unikeUtsettelseÅrsaker[0]}`);
        return <FormattedMessage id="kalender.utsettelse" values={{ årsak: årsakTekst }} />;
    }

    return <FormattedMessage id="kalender.dinUtsettelse" />;
};

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
            return getFamiliehendelseTekst(barn);
        case PeriodeColor.BLUE:
        case PeriodeColor.GREEN:
            return <FormattedMessage id="kalender.dinPeriode" />;
        case PeriodeColor.BLUESTRIPED:
        case PeriodeColor.GREENSTRIPED:
            return <FormattedMessage id="kalender.dinPeriode.gradert" />;
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.LIGHTGREEN:
            return (
                <FormattedMessage
                    id="kalender.annenPartPeriode"
                    values={{ navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, intl.locale) }}
                />
            );
        case PeriodeColor.LIGHTBLUEGREEN:
        case PeriodeColor.LIGHTGREENBLUE:
            return <FormattedMessage id="kalender.samtidigUttak" values={{ navnAnnenPart }} />;
        case PeriodeColor.GREENOUTLINE:
            return erFarEllerMedmor ? (
                getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
            ) : (
                <FormattedMessage id="kalender.utsettelseAnnenPart" values={{ navnAnnenPart }} />
            );
        case PeriodeColor.BLUEOUTLINE:
            return erFarEllerMedmor ? (
                <FormattedMessage id="kalender.utsettelseAnnenPart" values={{ navnAnnenPart }} />
            ) : (
                getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
            );
        case PeriodeColor.ORANGE:
            return <FormattedMessage id="kalender.tapteDager" />;
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
    return uniqueColors.map((color) => (
        <div key={color} style={{ paddingBottom: '1rem' }}>
            <CalendarLabel iconType={color}>
                <BodyShort>
                    {getCalendarLabel(color, barn, navnAnnenPart, unikeUtsettelseÅrsaker, erFarEllerMedmor, intl)}
                </BodyShort>
            </CalendarLabel>
        </div>
    ));
};

export default UttaksplanLegend;
