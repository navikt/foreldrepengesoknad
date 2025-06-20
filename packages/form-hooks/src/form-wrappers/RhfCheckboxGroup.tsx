import { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { CheckboxGroup } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    description?: string;
    validate?: Array<(value: string | number) => any>;
    onChange?: (value: any) => void;
    children: ReactElement[];
} & UseControllerProps<T>;

export const RhfCheckboxGroup = <T extends FieldValues>({
    label,
    description,
    validate = [],
    onChange,
    children,
    ...controllerProps
}: Props<T>) => {
    const { name, control, disabled = false } = controllerProps;

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

    const onChangeFn = useCallback(
        (value: any[]) => {
            if (onChange) {
                onChange(value);
            }
            field.onChange(value);
        },
        [field, onChange],
    );

    return (
        <CheckboxGroup
            name={name}
            description={description}
            value={field.value !== undefined ? field.value : []}
            onChange={onChangeFn}
            legend={label}
            disabled={disabled}
            error={getError(errors, name)}
        >
            {children}
        </CheckboxGroup>
    );
};
