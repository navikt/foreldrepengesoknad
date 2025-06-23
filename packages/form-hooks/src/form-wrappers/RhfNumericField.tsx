import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: string | number) => ValidationReturnType>;
    description?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    maxLength?: number;
    className?: string;
    style?: CSSProperties;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfNumericField = <T extends FieldValues>({
    label,
    validate = [],
    onChange,
    description,
    autoFocus,
    maxLength,
    className,
    style,
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

    const onChangeFn = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(evt);
            if (onChange) {
                onChange(evt.currentTarget.value);
            }
        },
        [field, onChange],
    );

    return (
        <TextField
            ref={field.ref}
            value={field.value ?? ''}
            label={label}
            description={description}
            type="text"
            inputMode="numeric"
            error={getError(errors, name)}
            autoFocus={autoFocus}
            autoComplete="off"
            maxLength={maxLength}
            disabled={disabled}
            className={className}
            style={style}
            onChange={onChangeFn}
        />
    );
};
