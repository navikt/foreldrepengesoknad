import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { ErrorSummary } from '@navikt/ds-react';

const ErrorSummaryHookForm: React.FunctionComponent = () => {
    const intl = useIntl();
    const {
        formState: { errors },
        setFocus,
    } = useFormContext();

    useEffect(() => {
        const firstError = (Object.keys(errors) as Array<keyof typeof errors>).reduce<keyof typeof errors | null>(
            (field, a) => {
                const fieldKey = field as keyof typeof errors;
                return !!errors[fieldKey] ? fieldKey : a;
            },
            null,
        );

        if (firstError) {
            setFocus(firstError);
        }
    }, [errors]);

    return (
        <>
            {Object.keys(errors).length > 0 && (
                <ErrorSummary heading={intl.formatMessage({ id: 'feiloppsummering.tittel' })}>
                    {Object.values(errors).map((error, index) => (
                        <ErrorSummary.Item
                            onClick={() => {
                                setFocus(Object.keys(errors)[index]);
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
