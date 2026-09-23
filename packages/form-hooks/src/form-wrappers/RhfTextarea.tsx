import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react';
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
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const onChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            field.onChange(
                event.currentTarget.value === '' ? null : replaceInvisibleCharsWithSpace(event.currentTarget.value),
            );
        },
        [field],
    );

    const onBlur = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            const value = event.currentTarget.value;
            const trimmetVerdi = value.trim();

            if (trimmetVerdi !== value) {
                field.onChange(trimmetVerdi === '' ? null : trimmetVerdi);
            }

            field.onBlur();
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
            value={field.value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            error={getError(errors, name)}
            maxLength={maxLength}
            minLength={minLength}
        />
    );
};
