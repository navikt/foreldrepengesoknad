import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { RadioGroup as DsRadioGroup } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

interface Props {
    name: string;
    description?: string | ReactNode;
    label?: string | ReactNode;
    validate?: Array<(value: string | number | boolean) => any>;
    onChange?: (value: string | boolean | number) => void;
    children: ReactElement[];
}

const RadioGroup: FunctionComponent<Props> = ({ label, description, name, validate = [], onChange, children }) => {
    const {
        formState: { errors },
    } = useFormContext();
    const { field } = useController({
        name,
        rules: {
            validate: getValidationRules(validate),
        },
    });

    return (
        <DsRadioGroup
            name={name}
            value={field.value !== undefined ? field.value : null}
            legend={label}
            description={description}
            error={getError(errors, name)}
            onChange={(value) => {
                if (onChange) {
                    onChange(value);
                }
                field.onChange(value);
            }}
        >
            {children.map((child, index) => {
                //TODO Vurder å heller lage ein wrapper til children
                //Denne map'en legg til ref for å kunna setta fokus ved feil
                if (index === 0) {
                    return React.cloneElement(child, { key: child.key, ref: field.ref });
                }
                return child;
            })}
        </DsRadioGroup>
    );
};

export default RadioGroup;
