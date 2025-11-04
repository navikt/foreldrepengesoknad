import { ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: string) => ValidationReturnType>;
    options: string[];
    description?: ReactNode;
    className?: string;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfCombobox = <T extends FieldValues>({
    label,
    validate = [],
    description,
    className,
    options,
    ...controllerProps
}: Props<T>) => {
    const { name, control, disabled } = controllerProps;

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

    const onToggleSelected = (option: string, isSelected: boolean, isCustomOption: boolean) => {
        if (!isCustomOption) {
            field.onChange(isSelected ? option : '');
        }
    };

    return (
        <UNSAFE_Combobox
            ref={field.ref}
            label={label}
            selectedOptions={field.value ? [field.value] : undefined}
            description={description}
            className={className}
            onToggleSelected={onToggleSelected}
            error={getError(errors, name)}
            disabled={disabled}
            options={options}
            clearButton={false}
        />
    );
};
