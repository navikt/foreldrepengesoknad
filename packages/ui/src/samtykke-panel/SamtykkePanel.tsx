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
    id?: string;
}

export const SamtykkePanel = ({ label, checked, onChange, error, children, name, onBlur, checkboxRef, id }: Props) => {
    const background = getBackground(checked, !!error);

    return (
        <Box background={background} padding="space-16" borderRadius="8">
            <VStack gap="space-16">
                {children}
                <Checkbox
                    id={id}
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

const getBackground = (checked: boolean, hasError: boolean) => {
    if (checked) {
        return 'success-moderate';
    }
    if (hasError) {
        return 'danger-moderate';
    }
    return 'warning-moderate';
};
