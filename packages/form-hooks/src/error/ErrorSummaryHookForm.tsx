/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
import { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';

import { ErrorSummaryFp } from '@navikt/fp-ui';

const findAllErrors = (errors: FieldErrors<FieldValues>): FieldErrors<FieldValues> => {
    return Object.keys(errors).reduce<FieldErrors<FieldValues>>((acc, fieldKey) => {
        const fieldValue = errors[fieldKey];

        if (fieldValue?.message && !acc[fieldKey]) {
            const shouldNotAdd = Object.keys(acc).some((key) => acc[key]?.message === fieldValue?.message);
            if (shouldNotAdd) {
                return acc;
            }
            return {
                ...acc,
                [fieldKey]: errors[fieldKey],
            };
        }

        if (Array.isArray(fieldValue)) {
            const alle = fieldValue.reduce((a, f) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    ...(f ? findAllErrors(f) : {}),
                    ...a,
                };
            }, {});
            return {
                ...acc,
                ...alle,
            };
        }
        return acc;
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

    const flattenAndUniqueErrors = findAllErrors(errors);

    const mappedErrors = Object.entries(flattenAndUniqueErrors).map(([fieldName, error]) => ({
        message: typeof error?.message === 'string' ? error.message : undefined,
        focus: () => setFocus(fieldName),
    }));

    return (
        Object.keys(flattenAndUniqueErrors).length > 0 && <ErrorSummaryFp errorRef={errorRef} errors={mappedErrors} />
    );
};
