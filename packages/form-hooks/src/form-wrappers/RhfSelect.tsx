import { CSSProperties, FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

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
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
}

const RhfSelect: FunctionComponent<Props> = ({
    name,
    label,
    validate = [],
    description,
    onChange,
    disabled,
    className,
    children,
    style,
    autofocusWhenEmpty,
    customErrorFormatter,
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
        <Select
            ref={field.ref}
            value={field.value}
            className={className}
            error={customErrorFormatter ? customErrorFormatter(getError(errors, name)) : getError(errors, name)}
            label={label}
            description={description}
            disabled={disabled}
            onChange={onChangeFn}
            style={style}
            autoFocus={autofocusWhenEmpty && field.value === undefined}
        >
            <option style={{ display: 'none' }} />,{children}
        </Select>
    );
};

export default RhfSelect;
