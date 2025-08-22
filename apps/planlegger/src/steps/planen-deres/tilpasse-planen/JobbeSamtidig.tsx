import { BriefcaseIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

export const JobbeSamtidig = () => {
    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <BriefcaseIcon
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
                    <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig.Tekst" />
                </BodyLong>
            </div>
        </HStack>
    );
};
