import { CalendarIcon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-types';
import { Uttaksdagen, formatDateExtended } from '@navikt/fp-utils';

import { Uttaksplanperiode, erPeriodeDto } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import { getOppholdskontoNavn } from '../../../utils/uttaksplanListeUtils';

interface Props {
    periode: Uttaksplanperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    inneholderKunEnPeriode: boolean;
}

export const OppholdsPeriodeContent = ({
    periode,
    inneholderKunEnPeriode,
    erFarEllerMedmor,
    navnPåForeldre,
}: Props) => {
    const intl = useIntl();

    const navnPåAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const annenPartsKontoType = erPeriodeDto(periode) ? periode.annenPart?.kontoType : undefined;

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-8">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">{getLengdePåPeriode(intl, inneholderKunEnPeriode, periode)}</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                {annenPartsKontoType && (
                    <BodyShort>
                        {getOppholdskontoNavn(intl, annenPartsKontoType, navnPåAnnenForelder, !erFarEllerMedmor)}
                    </BodyShort>
                )}
            </VStack>
        </HStack>
    );
};

const getLengdePåPeriode = (intl: IntlShape, inneholderKunEnPeriode: boolean, periode: Uttaksplanperiode) => {
    if (inneholderKunEnPeriode) {
        return intl.formatMessage({ id: 'uttaksplan.varighet.helePerioden' });
    }

    return `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`;
};
