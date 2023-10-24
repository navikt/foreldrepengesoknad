import { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Checkbox as DsCheckbox, ErrorMessage } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    validate?: ((value: string) => any)[];
    onChange?: (isChecked: boolean) => void;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Checkbox: FunctionComponent<Props> = ({ name, label, validate = [], onChange, className, disabled }) => {
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
            <DsCheckbox
                ref={field.ref}
                value={field.value}
                disabled={disabled}
                checked={field.value === true}
                className={className}
                error={!!error}
                onChange={onChangeFn}
            >
                {label}
            </DsCheckbox>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};

export default Checkbox;
