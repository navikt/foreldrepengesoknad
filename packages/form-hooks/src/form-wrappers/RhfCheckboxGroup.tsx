import { ReactElement, ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { CheckboxGroup } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    description?: string;
    validate?: Array<(value: string | number) => ValidationReturnType>;
    onChange?: (value: string[]) => void;
    children: ReactElement[];
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

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
            validate: getValidationRules(validate),
        },
    });

    const onChangeFn = (value: string[]) => {
        if (onChange) {
            onChange(value);
        }
        field.onChange(value);
    };

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
