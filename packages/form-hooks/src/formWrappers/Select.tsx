import { CSSProperties, FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Select as DsSelect } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    onChange?: (event: any) => void;
    validate?: Array<(value: string) => any>;
    children: React.ReactElement[];
    description?: ReactNode;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

const Select: FunctionComponent<Props> = ({
    name,
    label,
    validate = [],
    description,
    onChange,
    disabled,
    className,
    children,
    style,
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
            value={field.value}
            className={className}
            error={getError(errors, name)}
            label={label}
            description={description}
            disabled={disabled}
            onChange={onChangeFn}
            style={style}
        >
            <option style={{ display: 'none' }} />,{children}
        </DsSelect>
    );
};

export default Select;
