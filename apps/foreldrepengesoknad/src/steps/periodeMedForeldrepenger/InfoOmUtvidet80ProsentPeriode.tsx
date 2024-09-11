import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

const InfoOmUtvidet80ProsentPeriode = () => {
    return (
        <VStack gap="4" style={{ width: '85%' }}>
            <Heading size="xsmall">
                <FormattedMessage id="Utvidet80ProsentPeriodePanel.Heading" />
            </Heading>
            <BodyShort>
                <FormattedMessage id="Utvidet80ProsentPeriodePanel.Del1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="Utvidet80ProsentPeriodePanel.Del2" />
            </BodyShort>
        </VStack>
    );
};

export default InfoOmUtvidet80ProsentPeriode;
