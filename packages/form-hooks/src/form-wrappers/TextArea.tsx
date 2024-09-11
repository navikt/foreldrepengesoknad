import { Textarea } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { replaceInvisibleCharsWithSpace, getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    maxLength?: number;
    minLength?: number;
    validate?: Array<(value: string) => any>;
    className?: string;
    description?: string;
}

const TextArea: FunctionComponent<Props> = ({
    name,
    label,
    maxLength,
    minLength,
    validate = [],
    className,
    description,
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

export default TextArea;
