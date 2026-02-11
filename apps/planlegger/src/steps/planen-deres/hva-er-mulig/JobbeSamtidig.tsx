import { BriefcaseIcon, Buildings3Icon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

export const JobbeSamtidig = () => {
    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <Buildings3Icon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.JobbeSamtidig" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="HvaErMulig.ManKanJobbeSamtidig" />
                </BodyLong>
            </div>
        </HStack>
    );
};
