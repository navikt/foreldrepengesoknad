import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

const Aleneforsørger: FunctionComponent = () => {
    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="oversikt.tittelDeg" />
            </Heading>
        </VStack>
    );
};

export default Aleneforsørger;
