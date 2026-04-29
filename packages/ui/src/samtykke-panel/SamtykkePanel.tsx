import { ReactNode } from 'react';

import { Box, Checkbox, ErrorMessage, VStack } from '@navikt/ds-react';

interface Props {
    label: string;
    checked: boolean;
    onChange: () => void;
    error?: string | false;
    children?: ReactNode;
}

export const SamtykkePanel = ({ label, checked, onChange, error, children }: Props) => {
    const background = checked ? 'success-moderate' : error ? 'danger-moderate' : 'warning-moderate';

    return (
        <Box background={background} padding="space-16" borderRadius="8">
            <VStack gap="space-16">
                {children}
                <Checkbox checked={checked} onChange={onChange} error={!!error}>
                    {label}
                </Checkbox>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </VStack>
        </Box>
    );
};
