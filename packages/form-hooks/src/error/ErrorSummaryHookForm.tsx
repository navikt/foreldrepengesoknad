import { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';

import { ErrorSummaryFelles } from '@navikt/fp-ui';

import { lagFeltId } from '../form-wrappers/feltId';

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
        formState: { errors, submitCount },
        setFocus,
        control,
    } = useFormContext();

    // `errors` gets a new object reference on every keystroke once the form has been submitted once
    // (React Hook Form's default reValidateMode is 'onChange'). Focusing on every such change would steal
    // focus away from whatever field the user is actively typing into. We only want to move focus to the
    // error summary right after a submit attempt, so we key off `submitCount` instead of `errors`.
    useEffect(() => {
        if (submitCount > 0 && errorRef?.current) {
            errorRef.current.focus();
        }
    }, [submitCount]);

    const flattenAndUniqueErrors = dedupErrorsByMessage(findAllErrors(errors));

    const mappedErrors = Object.entries(flattenAndUniqueErrors).map(([fieldName, error]) => {
        const feltId = lagFeltId(control, fieldName);
        return {
            message: typeof error?.message === 'string' ? error.message : undefined,
            href: `#${feltId}`,
            focus: () => {
                setFocus(fieldName);
                // Felt med feil satt via setError (f.eks. filopplaster) har ingen RHF-ref som setFocus kan bruke.
                const felt = document.getElementById(feltId);
                if (felt && !felt.contains(document.activeElement)) {
                    felt.focus();
                }
            },
        };
    });

    return (
        Object.keys(flattenAndUniqueErrors).length > 0 && (
            <ErrorSummaryFelles errorRef={errorRef} errors={mappedErrors} />
        )
    );
};
