import { ReactElement, forwardRef } from 'react';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { BlueHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

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
                <BlueHeading>
                    <HStack gap="5" align="center" wrap={false}>
                        {icon && (
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                            </IconCircleWrapper>
                        )}
                        <VStack gap="1">
                            <Heading size={description ? 'xsmall' : 'medium'}>{label}</Heading>
                            {description && <BodyShort size="medium">{description}</BodyShort>}
                        </VStack>
                    </HStack>
                </BlueHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default VeiviserPage;
