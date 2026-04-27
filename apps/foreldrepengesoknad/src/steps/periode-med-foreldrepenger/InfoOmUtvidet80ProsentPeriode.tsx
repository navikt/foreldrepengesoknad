import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

export const InfoOmUtvidet80ProsentPeriode = () => {
    return (
        <VStack gap="space-16" style={{ width: '85%' }}>
            <Heading size="xsmall">
                <FormattedMessage id="InfoOmUtvidet80ProsentPeriode.Heading" />
            </Heading>
            <BodyShort>
                <FormattedMessage id="InfoOmUtvidet80ProsentPeriode.Del1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="InfoOmUtvidet80ProsentPeriode.Del2" />
            </BodyShort>
        </VStack>
    );
};
