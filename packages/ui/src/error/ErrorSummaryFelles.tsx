import { FormattedMessage } from 'react-intl';

import { ErrorSummary } from '@navikt/ds-react';

export type ErrorSummaryError = {
    message?: string;
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
                    onClick={() => {
                        if (error.focus) {
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
