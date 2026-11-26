import { ReactElement, Ref } from 'react';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { BlueHeading } from '../boxes/BlueHeading';
import { useFokusVedNavigasjon } from '../fokus/useFokusVedNavigasjon';
import { IconCircleWrapper } from '../icon-circle/IconCircleWrapper';
import { Page } from '../page/Page';

interface Props {
    label: string;
    description?: string;
    children: React.ReactElement | React.ReactElement[];
    icon?: ReactElement;
    ref?: Ref<HTMLDivElement>;
}

export const VeiviserPage = ({ label, description, children, icon, ref }: Props) => {
    const overskriftRef = useFokusVedNavigasjon<HTMLHeadingElement>(location.pathname);
    return (
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
                                <Heading ref={overskriftRef} size={description ? 'xsmall' : 'medium'}>
                                    {label}
                                </Heading>
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
    );
};
