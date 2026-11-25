import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

import { BlueHeading, IconCircleWrapper, Page, useFokusVedNavigasjon } from '@navikt/fp-ui';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const OppsummeringHeader = ({ children }: Props) => {
    const overskriftRef = useFokusVedNavigasjon<HTMLHeadingElement>('oppsummering');
    return (
        <Page
            header={
                <BlueHeading>
                    <HStack gap="space-16" align="center">
                        <Show below="md">
                            <IconCircleWrapper color="lightBlue" size="large">
                                <CheckmarkIcon height={34} width={34} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                        </Show>
                        <Show above="md">
                            <IconCircleWrapper color="lightBlue" size="large">
                                <CheckmarkIcon height={30} width={30} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                        </Show>
                        <Heading ref={overskriftRef} size="medium">
                            <FormattedMessage id="OppsummeringHeader.Tittel" />
                        </Heading>
                    </HStack>
                </BlueHeading>
            }
        >
            {children}
        </Page>
    );
};
