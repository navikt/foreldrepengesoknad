import { CSSProperties, FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField as DsTextField } from '@navikt/ds-react';

import { getError, getValidationRules, replaceInvisibleCharsWithSpace } from './formUtils';

export interface Props {
    name: string;
    label?: string | ReactNode;
    validate?: Array<(value: string) => any> | Array<(value: number) => any>;
    description?: string;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
    maxLength?: number;
    disabled?: boolean;
    type?: 'email' | 'password' | 'tel' | 'text' | 'url';
    className?: string;
    style?: CSSProperties;
    shouldReplaceInvisibleChars?: boolean;
}

const TextField: FunctionComponent<Props> = ({
    name,
    label,
    validate = [],
    type,
    onChange,
    description,
    autoFocus,
    maxLength,
    disabled,
    className,
    style,
    shouldReplaceInvisibleChars = false,
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
        <DsTextField
            ref={field.ref}
            value={field.value || ''}
            label={label}
            description={description}
            type={type}
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

export default TextField;
