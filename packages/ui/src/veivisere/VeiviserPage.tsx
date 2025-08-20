import { ReactElement, forwardRef } from 'react';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { BlueHeading } from '../boxes/BlueHeading';
import { IconCircleWrapper } from '../icon-circle/IconCircleWrapper';
import { Page } from '../page/Page';

interface Props {
    label: string;
    description?: string;
    children: React.ReactElement | React.ReactElement[];
    icon?: ReactElement;
}

export const VeiviserPage = forwardRef<HTMLDivElement, Props>(({ label, description, children, icon }, ref) => (
    <>
        <Page
            header={
                <BlueHeading>
                    <HStack gap="space-20" align="center" wrap={false}>
                        {icon && (
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                            </IconCircleWrapper>
                        )}
                        <VStack gap="space-4">
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
