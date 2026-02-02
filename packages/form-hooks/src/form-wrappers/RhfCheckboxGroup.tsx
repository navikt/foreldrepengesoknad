import { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import {
    FieldPath,
    FieldPathValue,
    FieldValues,
    PathValue,
    UseControllerProps,
    useController,
    useFormContext,
} from 'react-hook-form';

import { CheckboxGroup } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    label: string | ReactNode;
    description?: string;
    validate?: Array<(value: FieldPathValue<TFieldValues, TName>) => ValidationReturnType>;
    onChange?: (value: FieldPathValue<TFieldValues, TName>) => void;
    children: ReactElement[];
    control: UseControllerProps<TFieldValues, TName>['control'];
} & Omit<UseControllerProps<TFieldValues, TName>, 'control'>;

export const RhfCheckboxGroup = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    label,
    description,
    validate = [],
    onChange,
    children,
    ...controllerProps
}: Props<TFieldValues, TName>) => {
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
        (value: string[]) => {
            if (onChange) {
                onChange(value as PathValue<TFieldValues, TName>);
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
