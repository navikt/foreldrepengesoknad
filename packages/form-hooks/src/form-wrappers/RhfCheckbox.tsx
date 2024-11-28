import { ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Checkbox, ErrorMessage } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    validate?: Array<(value: string) => any>;
    onChange?: (isChecked: boolean) => void;
    className?: string;
    disabled?: boolean;
}

export const RhfCheckbox = ({ name, label, validate = [], onChange, className, disabled }: Props) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
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
