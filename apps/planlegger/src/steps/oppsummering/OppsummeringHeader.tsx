import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

import { BlueHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const OppsummeringHeader = ({ children }: Props) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading>
                        <HStack gap="space-16" align="center">
                            <IconCircleWrapper color="lightBlue" size="large">
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
                        <HStack gap="space-16" align="center">
                            <IconCircleWrapper color="lightBlue" size="large">
                                <CheckmarkIcon height={30} width={30} fontSize="1.5rem" aria-hidden />
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
