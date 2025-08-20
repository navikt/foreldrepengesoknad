import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

export const Barnehageplass = () => {
    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small" level="4">
                    <FormattedMessage id="OmÅTilpassePlanen.Barnehageplass" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.Barnehageplass.Tekst" />
                </BodyLong>
            </div>
        </HStack>
    );
};
