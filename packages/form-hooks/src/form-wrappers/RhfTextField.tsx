import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { TextFieldProps as DsTextFieldProps, TextField } from '@navikt/ds-react';

import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label?: string | ReactNode;
    validate?: Array<(value: string) => ValidationReturnType>;
    description?: string;
    onChange?: (value: string | null) => void;
    autoFocus?: boolean;
    type?: 'email' | 'password' | 'tel' | 'text' | 'url';
    className?: string;
    style?: CSSProperties;
    shouldReplaceInvisibleChars?: boolean;
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    control: UseControllerProps<T>['control'];
} & DsTextFieldProps &
    Omit<UseControllerProps<T>, 'control'>;

export const RhfTextField = <T extends FieldValues>({
    label,
    validate = [],
    type,
    onChange,
    description,
    autoFocus,
    className,
    style,
    shouldReplaceInvisibleChars = false,
    autofocusWhenEmpty,
    customErrorFormatter,
    ...rest
}: Props<T>) => {
    const { name, control, disabled, onBlur: onBlurProp } = rest;

    const {
        formState: { errors },
    } = useFormContext<T>();

    const { field } = useController({
        name,
        control,
        disabled,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const onChangeFn = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const parsedValues = shouldReplaceInvisibleChars
                ? replaceInvisibleCharsWithSpace(evt.currentTarget.value)
                : evt.currentTarget.value;

            field.onChange(parsedValues);

            if (onChange) {
                onChange(parsedValues);
            }
        },
        [field, onChange, shouldReplaceInvisibleChars],
    );

    const onBlurFn = useCallback(
        (evt: React.FocusEvent<HTMLInputElement>) => {
            const value = evt.currentTarget.value;
            const trimmetVerdi = value.trim();

            if (trimmetVerdi !== value) {
                field.onChange(trimmetVerdi);

                if (onChange) {
                    onChange(trimmetVerdi);
                }
            }

            field.onBlur();
            onBlurProp?.(evt);
        },
        [field, onChange, onBlurProp],
    );

    return (
        <TextField
            ref={field.ref}
            value={field.value ?? ''}
            label={label}
            description={description}
            type={type}
            error={customErrorFormatter ? customErrorFormatter(getError(errors, name)) : getError(errors, name)}
            autoFocus={autoFocus || (autofocusWhenEmpty && field.value === undefined)}
            autoComplete="off"
            disabled={disabled}
            className={className}
            style={style}
            onChange={onChangeFn}
            {...rest}
            onBlur={onBlurFn}
        />
    );
};
