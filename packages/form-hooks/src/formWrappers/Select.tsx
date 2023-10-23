import { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Select as DsSelect } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

export interface OwnProps {
    name: string;
    label: string | ReactNode;
    onChange?: (event: any) => void;
    validate?: Array<(value: string) => any>;
    children: React.ReactElement[];
    description?: ReactNode;
    disabled?: boolean;
    className?: string;
}

const Select: FunctionComponent<OwnProps> = ({
    name,
    label,
    validate = [],
    description,
    onChange,
    disabled,
    className,
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
        (evt: React.ChangeEvent) => {
            if (onChange) {
                onChange(evt);
            }
            field.onChange(evt);
        },
        [field, onChange],
    );

    return (
        <DsSelect
            ref={field.ref}
            className={className}
            error={getError(errors, name)}
            label={label}
            description={description}
            value={field.value}
            disabled={disabled}
            onChange={onChangeFn}
        >
            <option style={{ display: 'none' }} />,{children}
        </DsSelect>
    );
};

export default Select;
