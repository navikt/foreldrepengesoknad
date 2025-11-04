import React, { ReactElement, ReactNode, useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { RadioGroup } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    description?: string | ReactNode;
    label?: string | ReactNode;
    validate?: Array<(value: string | number | boolean) => ValidationReturnType>;
    onChange?: (value: string | boolean | number) => void;
    children: ReactElement[];
    className?: string;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfRadioGroup = <T extends FieldValues>({
    label,
    description,
    validate = [],
    onChange,
    children,
    className,
    customErrorFormatter,
    ...controllerProps
}: Props<T>) => {
    const { name, control } = controllerProps;

    const {
        formState: { errors },
    } = useFormContext();
    const { field } = useController({
        name,
        control,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    return (
        <RadioGroup
            name={name}
            value={field.value !== undefined ? field.value : null}
            legend={label}
            description={description}
            error={customErrorFormatter ? customErrorFormatter(getError(errors, name)) : getError(errors, name)}
            onChange={(value) => {
                if (onChange) {
                    onChange(value);
                }
                field.onChange(value);
            }}
            className={className}
        >
            {children.map((child, index) => {
                //TODO Vurder å heller lage ein wrapper til children
                //Denne map'en legg til ref for å kunna setta fokus ved feil
                if (index === 0) {
                    // @ts-expect-error fiks
                    return React.cloneElement(child, { key: child.key, ref: field.ref });
                }
                return child;
            })}
        </RadioGroup>
    );
};
