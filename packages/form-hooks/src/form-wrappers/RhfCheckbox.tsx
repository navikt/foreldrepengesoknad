import { ReactNode, useCallback, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { Checkbox, ErrorMessage } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: string) => ValidationReturnType>;
    onChange?: (isChecked: boolean) => void;
    className?: string;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfCheckbox = <T extends FieldValues>({
    label,
    validate = [],
    onChange,
    className,
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
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const error = getError(errors, name);

    const onChangeFn = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(evt);
            if (onChange) {
                onChange(evt.currentTarget.checked);
            }
        },
        [field, onChange],
    );

    return (
        <>
            <Checkbox
                ref={field.ref}
                value={field.value}
                disabled={disabled}
                checked={field.value === true}
                className={className}
                error={!!error}
                onChange={onChangeFn}
            >
                {label}
            </Checkbox>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};
