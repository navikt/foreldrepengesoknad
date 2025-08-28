import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { TidsperiodenString } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';

interface Props {
    periode: Planperiode;
    isHull: boolean;
}

export const PeriodeUtenUttakContent = ({ periode, isHull }: Props) => {
    const intl = useIntl();

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-4">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">
                        <FormattedMessage id="uttaksplan.varighet.helePerioden" />
                    </BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <BodyShort>
                    {isHull ? (
                        <FormattedMessage id="uttaksplan.periodeListeContent.tapteDager" />
                    ) : (
                        <FormattedMessage id="uttaksplan.periodeListeContent.periodeUtenUttak" />
                    )}
                </BodyShort>
            </VStack>
        </HStack>
    );
};
