import React, { ReactElement, ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { RadioGroup } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    description?: string | ReactNode;
    label?: string | ReactNode;
    validate?: Array<(value: string | number | boolean) => any>;
    onChange?: (value: string | boolean | number) => void;
    children: ReactElement[];
    className?: string;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
} & UseControllerProps<T>;

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
            validate: getValidationRules(validate),
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
            {children.map((child: any, index) => {
                //TODO Vurder å heller lage ein wrapper til children
                //Denne map'en legg til ref for å kunna setta fokus ved feil
                if (index === 0) {
                    return React.cloneElement(child, { key: child.key, ref: field.ref });
                }
                return child;
            })}
        </RadioGroup>
    );
};
