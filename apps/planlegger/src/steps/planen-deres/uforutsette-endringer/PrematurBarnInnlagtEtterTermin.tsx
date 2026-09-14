import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    erAleneforsørger: boolean;
}

export const PrematurBarnInnlagtEtterTermin = ({ erAleneforsørger }: Props) => (
    <HStack gap="space-20" wrap={false}>
        <div>
            <IconCircleWrapper color="lightBlue" size="medium">
                <StethoscopeIcon
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
                <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtEtterTermin" />
            </Heading>
            <BodyLong>
                <FormattedMessage
                    id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtEtterTermin.Tekst"
                    values={{ erAleneforsørger }}
                />
            </BodyLong>
        </div>
    </HStack>
);
