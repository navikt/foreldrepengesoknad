import { ChangeEvent, ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    maxLength?: number;
    minLength?: number;
    validate?: Array<(value: string) => ValidationReturnType>;
    className?: string;
    description?: string;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfTextarea = <T extends FieldValues>({
    label,
    maxLength,
    minLength,
    validate = [],
    className,
    description,
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

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        field.onChange(
            event.currentTarget.value === '' ? null : replaceInvisibleCharsWithSpace(event.currentTarget.value),
        );
    };

    return (
        <Textarea
            label={label}
            description={description}
            className={className}
            autoComplete="off"
            {...field}
            value={field.value ?? ''}
            onChange={onChange}
            error={getError(errors, name)}
            maxLength={maxLength}
            minLength={minLength}
        />
    );
};
