import { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';

import { ErrorSummaryFp } from '@navikt/fp-ui';

const findAllErrors = (errors: FieldErrors<FieldValues>, pathPrefix = ''): FieldErrors<FieldValues> => {
    return Object.keys(errors).reduce<FieldErrors<FieldValues>>((acc, fieldKey) => {
        const fieldValue = errors[fieldKey];
        const fullPath = pathPrefix ? `${pathPrefix}.${fieldKey}` : fieldKey;

        if (fieldValue?.message) {
            return {
                ...acc,
                [fullPath]: fieldValue,
            };
        }

        if (Array.isArray(fieldValue)) {
            const alle = (fieldValue as Array<FieldErrors<FieldValues>>).reduce<FieldErrors<FieldValues>>(
                (a, f, index) => {
                    return {
                        ...a,
                        ...(f ? findAllErrors(f, `${fullPath}.${index}`) : {}),
                    };
                },
                {},
            );
            return {
                ...acc,
                ...alle,
            };
        }
        return acc;
    }, {});
};

const dedupErrorsByMessage = (errors: FieldErrors<FieldValues>): FieldErrors<FieldValues> => {
    const seenMessages = new Set<string>();
    return Object.keys(errors).reduce<FieldErrors<FieldValues>>((acc, key) => {
        const message = errors[key]?.message;
        if (typeof message !== 'string' || seenMessages.has(message)) {
            return acc;
        }
        seenMessages.add(message);
        return { ...acc, [key]: errors[key] };
    }, {});
};

export const ErrorSummaryHookForm = () => {
    const errorRef = useRef<HTMLDivElement>(null);

    const {
        formState: { errors },
        setFocus,
    } = useFormContext();

    useEffect(() => {
        if (errorRef?.current) {
            errorRef.current.focus();
        }
    }, [errors]);

    const flattenAndUniqueErrors = dedupErrorsByMessage(findAllErrors(errors));

    const mappedErrors = Object.entries(flattenAndUniqueErrors).map(([fieldName, error]) => ({
        message: typeof error?.message === 'string' ? error.message : undefined,
        focus: () => setFocus(fieldName),
    }));

    return (
        Object.keys(flattenAndUniqueErrors).length > 0 && <ErrorSummaryFp errorRef={errorRef} errors={mappedErrors} />
    );
};
