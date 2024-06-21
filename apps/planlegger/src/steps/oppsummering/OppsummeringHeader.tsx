import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

import { GreenHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const OppsummeringHeader: React.FunctionComponent<Props> = ({ children }) => (
    <Page
        header={
            <>
                <Show below="md">
                    <GreenHeading isDarkGreen>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkGreen" size="large">
                                <CheckmarkIcon height={34} width={34} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
                <Show above="md">
                    <GreenHeading>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CheckmarkIcon height={40} width={40} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
            </>
        }
    >
        {children}
    </Page>
);

export default OppsummeringHeader;
