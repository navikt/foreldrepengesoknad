import { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField as DsTextField } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

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
            field.onChange(evt);
            if (onChange) {
                onChange(evt.currentTarget.value);
            }
        },
        [field, onChange],
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
            onChange={onChangeFn}
        />
    );
};

export default TextField;
