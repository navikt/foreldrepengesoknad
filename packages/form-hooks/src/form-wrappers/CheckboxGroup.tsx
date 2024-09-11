import { FunctionComponent, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { CheckboxGroup as DsCheckboxGroup } from '@navikt/ds-react';
import { useFormContext, useController } from 'react-hook-form';

import { getError, getValidationRules } from './formUtils';

interface CheckboxPanelProps {
    name: string;
    label: string | ReactNode;
    description?: string;
    validate?: Array<(value: string | number) => any>;
    onChange?: (value: any) => void;
    disabled?: boolean;
    children: ReactElement[];
}

const CheckboxGroup: FunctionComponent<CheckboxPanelProps> = ({
    label,
    name,
    description,
    validate = [],
    onChange,
    disabled = false,
    children,
}) => {
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
        <DsCheckboxGroup
            name={name}
            description={description}
            value={field.value !== undefined ? field.value : []}
            onChange={onChangeFn}
            legend={label}
            disabled={disabled}
            error={getError(errors, name)}
        >
            {children}
        </DsCheckboxGroup>
    );
};

export default CheckboxGroup;
