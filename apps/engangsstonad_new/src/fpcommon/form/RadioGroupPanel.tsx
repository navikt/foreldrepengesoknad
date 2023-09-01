import { FunctionComponent, ReactNode, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { RadioGroup } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

interface RadioGroupPanelProps {
    name: string;
    description?: string;
    label?: string | ReactNode;
    validate?: ((value: string | number) => any)[];
    children: ReactNode[];
}

const RadioGroupPanel: FunctionComponent<RadioGroupPanelProps> = ({
    label,
    description,
    name,
    validate = [],
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
        <RadioGroup
            name={name}
            value={field.value !== undefined ? field.value : null}
            legend={label}
            description={description}
            error={getError(errors, name)}
            onChange={(value) => {
                field.onChange(value);
            }}
        >
            {children}
        </RadioGroup>
    );
};

export default RadioGroupPanel;
