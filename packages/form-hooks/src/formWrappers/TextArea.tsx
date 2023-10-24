import { FunctionComponent, ReactNode, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Textarea } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    maxLength?: number;
    validate?: ((value: string) => any)[];
    className?: string;
    description?: string;
}

const TextArea: FunctionComponent<Props> = ({ name, label, maxLength, validate = [], className, description }) => {
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
        <Textarea
            label={label}
            description={description}
            className={className}
            autoComplete="off"
            {...field}
            value={field.value ? field.value : ''}
            error={getError(errors, name)}
            maxLength={maxLength}
        />
    );
};

export default TextArea;
