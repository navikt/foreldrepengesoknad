import { CSSProperties, FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TextField, TextFieldProps as DsTextFieldProps } from '@navikt/ds-react';

import { getError, getValidationRules, replaceInvisibleCharsWithSpace } from './formUtils';

export type Props = {
    name: string;
    label?: string | ReactNode;
    validate?: Array<(value: string) => any> | Array<(value: number) => any>;
    description?: string;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
    disabled?: boolean;
    type?: 'email' | 'password' | 'tel' | 'text' | 'url';
    className?: string;
    style?: CSSProperties;
    shouldReplaceInvisibleChars?: boolean;
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
} & DsTextFieldProps;

const RhfTextField: FunctionComponent<Props> = ({
    name,
    label,
    validate = [],
    type,
    onChange,
    description,
    autoFocus,
    disabled,
    className,
    style,
    shouldReplaceInvisibleChars = false,
    autofocusWhenEmpty,
    customErrorFormatter,
    ...rest
}) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        disabled,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const onChangeFn = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            // TODO (TOR) Skriv dette penare etterkvart som shouldReplaceInvisibleChars blir verifisert OK
            if (shouldReplaceInvisibleChars) {
                const parsedValues =
                    evt.currentTarget.value !== '' ? replaceInvisibleCharsWithSpace(evt.currentTarget.value) : null;
                field.onChange(parsedValues);
                if (onChange) {
                    onChange(parsedValues);
                }
            } else {
                field.onChange(evt);
                if (onChange) {
                    onChange(evt.currentTarget.value);
                }
            }
        },
        [field, onChange, shouldReplaceInvisibleChars],
    );

    return (
        <TextField
            ref={field.ref}
            value={field.value || ''}
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
        />
    );
};

export default RhfTextField;
