import { ReactNode } from 'react';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';

interface Props {
    pageTitle: ReactNode;
    heading: ReactNode;
    description: ReactNode;
    actionLabel: ReactNode;
    onAction: () => void;
}

export const ManglendeDataSide = ({ pageTitle, heading, description, actionLabel, onAction }: Props) => (
    <SkjemaRotLayout pageTitle={pageTitle}>
        <VStack gap="space-40">
            <Alert variant="warning">
                <VStack gap="space-16">
                    <Heading size="small" level="2">
                        {heading}
                    </Heading>
                    <BodyShort>{description}</BodyShort>
                </VStack>
            </Alert>
            <div>
                <Button type="button" variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            </div>
        </VStack>
    </SkjemaRotLayout>
);
