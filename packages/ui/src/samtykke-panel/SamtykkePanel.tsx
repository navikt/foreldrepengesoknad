import { ReactNode, Ref } from 'react';

import { Box, Checkbox, ErrorMessage, VStack } from '@navikt/ds-react';

interface Props {
    label: ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string | false;
    children?: ReactNode;
    name?: string;
    onBlur?: () => void;
    checkboxRef?: Ref<HTMLInputElement>;
}

export const SamtykkePanel = ({ label, checked, onChange, error, children, name, onBlur, checkboxRef }: Props) => {
    const background = checked ? 'success-moderate' : error ? 'danger-moderate' : 'warning-moderate';

    return (
        <Box background={background} padding="space-16" borderRadius="8">
            <VStack gap="space-16">
                {children}
                <Checkbox
                    ref={checkboxRef}
                    name={name}
                    onBlur={onBlur}
                    checked={checked}
                    onChange={(evt) => onChange(evt.target.checked)}
                    error={!!error}
                >
                    {label}
                </Checkbox>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </VStack>
        </Box>
    );
};
