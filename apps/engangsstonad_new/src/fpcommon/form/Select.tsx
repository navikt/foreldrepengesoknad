import { FunctionComponent, ReactNode, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Select as DsSelect } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

export interface OwnProps {
    name: string;
    label: string | ReactNode;
    onChange?: (event: any) => void;
    validate?: ((value: string) => any)[];
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

    return (
        <DsSelect
            className={className}
            error={getError(errors, name)}
            label={label}
            description={description}
            value={field.value}
            disabled={disabled}
            onChange={(evt) => {
                if (onChange) {
                    onChange(evt);
                }
                field.onChange(evt);
            }}
        >
            <option style={{ display: 'none' }} />,{children}
        </DsSelect>
    );
};

export default Select;
