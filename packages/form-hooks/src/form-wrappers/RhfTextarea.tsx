import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';

import { getError, getValidationRules } from './formUtils';

interface Props {
    name: string;
    label: string | ReactNode;
    maxLength?: number;
    minLength?: number;
    validate?: Array<(value: string) => any>;
    className?: string;
    description?: string;
}

export const RhfTextarea = ({ name, label, maxLength, minLength, validate = [], className, description }: Props) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const onChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            field.onChange(
                event.currentTarget.value !== '' ? replaceInvisibleCharsWithSpace(event.currentTarget.value) : null,
            );
        },
        [field],
    );

    return (
        <Textarea
            label={label}
            description={description}
            className={className}
            autoComplete="off"
            {...field}
            value={field.value || ''}
            onChange={onChange}
            error={getError(errors, name)}
            maxLength={maxLength}
            minLength={minLength}
        />
    );
};
