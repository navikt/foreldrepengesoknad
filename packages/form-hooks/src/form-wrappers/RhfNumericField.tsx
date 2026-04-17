import { CSSProperties, ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: string) => ValidationReturnType>;
    description?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
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
    onBlur,
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
            validate: getValidationRules(validate),
        },
    });

    const onChangeFn = (evt: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(evt);
        if (onChange) {
            onChange(evt.currentTarget.value);
        }
    };

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
            onBlur={(event) => onBlur?.(event.currentTarget.value)}
            maxLength={maxLength}
            disabled={disabled}
            className={className}
            style={style}
            onChange={onChangeFn}
        />
    );
};
