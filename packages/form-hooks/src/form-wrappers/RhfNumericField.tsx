import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

interface Props {
    name: string;
    label: string | ReactNode;
    validate?: Array<(value: string) => any> | Array<(value: number) => any>;
    description?: string;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
    maxLength?: number;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

export const RhfNumericField = ({
    name,
    label,
    validate = [],
    onChange,
    description,
    autoFocus,
    maxLength,
    disabled,
    className,
    style,
}: Props) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
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
            value={field.value || ''}
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
