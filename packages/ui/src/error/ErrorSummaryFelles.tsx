import { FormattedMessage } from 'react-intl';

import { ErrorSummary } from '@navikt/ds-react';

export type ErrorSummaryError = {
    message?: string;
    href: string;
    focus?: () => void;
};

interface Props {
    errorRef: React.RefObject<HTMLDivElement | null>;
    errors: ErrorSummaryError[];
}

export const ErrorSummaryFelles = ({ errorRef, errors }: Props) => {
    return (
        <ErrorSummary
            size="small"
            ref={errorRef}
            headingTag="h3"
            heading={<FormattedMessage id={'ErrorSummaryFelles.Tittel'} />}
        >
            {Object.values(errors).map((error) => (
                <ErrorSummary.Item
                    key={error.message}
                    href={error.href}
                    onClick={(event) => {
                        if (error.focus) {
                            // Standardhoppet treffer fieldset for radio-/avkrysningsgrupper, som ikke kan få fokus.
                            event.preventDefault();
                            error.focus();
                        }
                    }}
                >
                    {error.message}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
