import { ReactNode, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { Box, Checkbox, ErrorMessage, VStack } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: boolean) => ValidationReturnType>;
    children: React.ReactElement;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfConfirmationPanel = <T extends FieldValues>({
    label,
    validate = [],
    children,
    ...controllerProps
}: Props<T>) => {
    const { name, control } = controllerProps;

    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        control,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const errorMessage = getError(errors, name);
    const checked = field.value ?? false;

    const background = checked ? 'success-moderate' : errorMessage ? 'danger-moderate' : 'warning-moderate';

    return (
        <Box background={background} padding="space-16" borderRadius="8">
            <VStack gap="space-16">
                {children}
                <Checkbox
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
                    checked={checked}
                    onChange={(evt) => field.onChange(evt.target.checked)}
                    error={!!errorMessage}
                >
                    {label}
                </Checkbox>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </VStack>
        </Box>
    );
};
