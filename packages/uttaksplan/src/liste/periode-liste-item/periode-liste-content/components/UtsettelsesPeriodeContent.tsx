import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { Uttaksdagen } from '@navikt/fp-utils';

import { Uttaksplanperiode, erPeriodeDto } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import { finnTekstForUtsettelseÅrsak } from '../../../utils/uttaksplanListeUtils';
import { getMorsAktivitetTekst } from './UttaksperiodeContent';

interface Props {
    periode: Uttaksplanperiode;
}

export const UtsettelsesPeriodeContent = ({ periode }: Props) => {
    const intl = useIntl();

    const side = erPeriodeDto(periode) ? (periode.søker ?? periode.annenPart) : undefined;

    if (!side?.utsettelseÅrsak) {
        return null;
    }

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-8">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">
                        <FormattedMessage id="uttaksplan.varighet.helePerioden" />
                    </BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <HStack gap="space-8">
                    {side.morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, side.morsAktivitet)}</BodyShort>
                    )}
                    {side.utsettelseÅrsak !== 'FRI' && (
                        <BodyShort>{finnTekstForUtsettelseÅrsak(intl, side.utsettelseÅrsak)}</BodyShort>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};
