import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

import { BlueHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const OppsummeringHeader: React.FunctionComponent<Props> = ({ children }) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading isDarkBlue>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkBlue" size="large">
                                <CheckmarkIcon height={34} width={34} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </BlueHeading>
                </Show>
                <Show above="md">
                    <BlueHeading>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkBlue" size="xl">
                                <CheckmarkIcon height={40} width={40} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </BlueHeading>
                </Show>
            </>
        }
    >
        {children}
    </Page>
);

export default OppsummeringHeader;
