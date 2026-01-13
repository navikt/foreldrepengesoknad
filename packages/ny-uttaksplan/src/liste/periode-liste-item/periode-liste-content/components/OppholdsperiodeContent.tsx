import { CalendarIcon } from '@navikt/aksel-icons';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';

import { Uttaksplanperiode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
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
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                {erVanligUttakPeriode(periode) && periode.oppholdÅrsak && (
                    <BodyShort>
                        {getOppholdskontoNavn(intl, periode.oppholdÅrsak, navnPåAnnenForelder, !erFarEllerMedmor)}
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
