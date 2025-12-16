import { CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { BlueHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const PlanleggerForside = ({ children }: Props) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading>
                        <VStack gap="space-16" align="center">
                            <IconCircleWrapper color="lightBlue" size="xl">
                                <CalendarIcon height={44} width={44} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <VStack gap="space-4" align="center">
                                <Heading size="large">
                                    <FormattedMessage id="PlanleggerForside.Tittel" />
                                </Heading>
                                <HStack gap="space-8" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>
                                        <FormattedMessage id="PlanleggerForside.Label" />
                                    </BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </BlueHeading>
                </Show>
                <Show above="md">
                    <BlueHeading>
                        <VStack gap="space-16">
                            <IconCircleWrapper color="lightBlue" size="large">
                                <CalendarIcon height={30} width={30} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <VStack gap="space-4">
                                <Heading size="large">
                                    <FormattedMessage id="PlanleggerForside.Tittel" />
                                </Heading>
                                <HStack gap="space-8" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>
                                        <FormattedMessage id="PlanleggerForside.Label" />
                                    </BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </BlueHeading>
                </Show>
            </>
        }
    >
        {children}
    </Page>
);
