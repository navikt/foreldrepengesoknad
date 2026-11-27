import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

type Props = {
    headingLevel: '3' | '4';
};

export const InfoOmUtvidet80ProsentPeriode = ({ headingLevel }: Props) => {
    return (
        <VStack gap="space-16" style={{ width: '85%' }}>
            <Heading size="xsmall" level={headingLevel}>
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
