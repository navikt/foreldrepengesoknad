import React, { ReactElement, ReactNode } from 'react';
import {
    FieldPath,
    FieldPathValue,
    FieldValues,
    PathValue,
    UseControllerProps,
    useController,
    useFormContext,
} from 'react-hook-form';

import { RadioGroup } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    description?: string | ReactNode;
    label?: string | ReactNode;
    validate?: Array<(value: FieldPathValue<TFieldValues, TName>) => ValidationReturnType>;
    onChange?: (value: FieldPathValue<TFieldValues, TName>) => void;
    children: ReactElement[];
    className?: string;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    control: UseControllerProps<TFieldValues, TName>['control'];
} & Omit<UseControllerProps<TFieldValues, TName>, 'control'>;

export const RhfRadioGroup = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    label,
    description,
    validate = [],
    onChange,
    children,
    className,
    customErrorFormatter,
    ...controllerProps
}: Props<TFieldValues, TName>) => {
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
                    onChange(value as PathValue<TFieldValues, TName>);
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
