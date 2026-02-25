import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

export const NyttBarnFørTreÅr = () => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const kunEnPartSkalHa = rettighetType !== 'BEGGE_RETT';

    const erAleneOmOmsorg = rettighetType === 'ALENEOMSORG';

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>

            <div>
                <Heading size="small" level="4">
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisDuFårNyttBarnFørTreÅr"
                        values={{ erAleneforsørger: erAleneOmOmsorg }}
                    />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisDuFårNyttBarnFørTreÅr.Tekst"
                        values={{ erAleneforsørger: kunEnPartSkalHa }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
