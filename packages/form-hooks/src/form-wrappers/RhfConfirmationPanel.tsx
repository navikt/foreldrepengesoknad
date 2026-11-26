import { ReactNode, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { SamtykkePanel } from '@navikt/fp-ui';

import { useFeltId } from './feltId';
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

    const feltId = useFeltId(name, control);

    const { field } = useController({
        name,
        control,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const errorMessage = getError(errors, name);

    return (
        <SamtykkePanel
            id={feltId}
            label={label}
            checked={field.value ?? false}
            onChange={(checked) => field.onChange(checked)}
            error={errorMessage}
            name={field.name}
            onBlur={field.onBlur}
            checkboxRef={field.ref}
        >
            {children}
        </SamtykkePanel>
    );
};
