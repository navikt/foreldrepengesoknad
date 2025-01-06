import { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { CheckboxGroup } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

interface Props {
    name: string;
    label: string | ReactNode;
    description?: string;
    validate?: Array<(value: string | number) => any>;
    onChange?: (value: any) => void;
    disabled?: boolean;
    children: ReactElement[];
}

export const RhfCheckboxGroup = ({
    label,
    name,
    description,
    validate = [],
    onChange,
    disabled = false,
    children,
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
        (value: any[]) => {
            if (onChange) {
                onChange(value);
            }
            field.onChange(value);
        },
        [field, onChange],
    );

    return (
        <CheckboxGroup
            name={name}
            description={description}
            value={field.value !== undefined ? field.value : []}
            onChange={onChangeFn}
            legend={label}
            disabled={disabled}
            error={getError(errors, name)}
        >
            {children}
        </CheckboxGroup>
    );
};
