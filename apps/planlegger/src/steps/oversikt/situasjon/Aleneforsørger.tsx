import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, ToggleGroup, VStack } from '@navikt/ds-react';

const Aleneforsørger: FunctionComponent = () => {
    return (
        <VStack gap="10">
            <VStack gap="5">
                <Heading size="large" spacing>
                    <FormattedMessage id="oversikt.tittelDeg" />
                </Heading>

                <ToggleGroup defaultValue="100" onChange={console.log} size="medium" variant="neutral">
                    <ToggleGroup.Item value="100">
                        <FormattedMessage id="oversikt.100" />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="80">
                        <FormattedMessage id="oversikt.80" />
                    </ToggleGroup.Item>
                </ToggleGroup>
            </VStack>
        </VStack>
    );
};

export default Aleneforsørger;
