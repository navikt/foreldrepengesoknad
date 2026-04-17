import { CSSProperties, ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    onChange?: (event: React.ChangeEvent<Element>) => void;
    validate?: Array<(value: string) => ValidationReturnType>;
    children: React.ReactElement[];
    description?: ReactNode;
    className?: string;
    style?: CSSProperties;
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfSelect = <T extends FieldValues>({
    label,
    validate = [],
    description,
    onChange,
    className,
    children,
    style,
    autofocusWhenEmpty,
    customErrorFormatter,
    ...controllerProps
}: Props<T>) => {
    const { name, control, disabled } = controllerProps;

    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        control,
        rules: {
            validate: getValidationRules(validate),
        },
    });

    const onChangeFn = (evt: React.ChangeEvent) => {
        if (onChange) {
            onChange(evt);
        }
        field.onChange(evt);
    };

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
