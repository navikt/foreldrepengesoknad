import { CalendarIcon } from '@navikt/aksel-icons';
import { ReactElement, forwardRef } from 'react';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { GreenHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    label: string;
    description?: string;
    children: React.ReactElement | React.ReactElement[];
    icon?: ReactElement;
}

const VeiviserPage = forwardRef<HTMLDivElement, Props>(({ label, description, children, icon }, ref) => (
    <>
        <Page
            header={
                <GreenHeading>
                    <HStack gap="5" align="center" wrap={false}>
                        <IconCircleWrapper color="darkGreen" size="xl">
                            {icon}
                            {!icon && <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
                        </IconCircleWrapper>
                        <VStack gap="2">
                            <Show below="md">
                                <Heading size="medium">{label}</Heading>
                            </Show>
                            <Show above="md">
                                <Heading size="large">{label}</Heading>
                            </Show>
                            {description && <BodyShort size="large">{description}</BodyShort>}
                        </VStack>
                    </HStack>
                </GreenHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default VeiviserPage;
