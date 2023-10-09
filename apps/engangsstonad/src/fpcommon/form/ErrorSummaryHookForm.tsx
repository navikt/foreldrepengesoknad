import { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { ErrorSummary } from '@navikt/ds-react';

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
                    ...(!!f ? findAllErrors(f) : {}),
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

const ErrorSummaryHookForm: React.FunctionComponent = () => {
    const intl = useIntl();
    const errorRef = useRef<HTMLDivElement>(null);

    const {
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        if (errorRef?.current) {
            errorRef.current.focus();
        }
    }, [errors]);

    const flattenAndUniqueErrors = findAllErrors(errors);

    return (
        <>
            {Object.keys(flattenAndUniqueErrors).length > 0 && (
                <ErrorSummary
                    size="small"
                    ref={errorRef}
                    heading={intl.formatMessage({ id: 'feiloppsummering.tittel' })}
                >
                    {Object.values(flattenAndUniqueErrors).map((error) => (
                        <ErrorSummary.Item
                            key={error?.message?.toString()}
                            onClick={() => {
                                if (error?.ref) {
                                    //@ts-ignore TODO Burde nok heller bruka setFocus her
                                    error.ref.focus();
                                }
                            }}
                        >
                            {error?.message?.toString()}
                        </ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}
        </>
    );
};

export default ErrorSummaryHookForm;
