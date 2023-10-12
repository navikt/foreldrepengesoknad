import { FunctionComponent } from 'react';
import { ErrorSummary } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import UiIntlProvider from '../i18n/UiIntlProvider';

export type ErrorSummaryError = {
    message?: string;
    focus?: () => void;
};

interface Props {
    errorRef: React.RefObject<HTMLDivElement>;
    errors: Array<ErrorSummaryError>;
}

const ErrorSummaryFp: FunctionComponent<Props> = ({ errorRef, errors }) => {
    return (
        <UiIntlProvider>
            <ErrorSummary size="small" ref={errorRef} heading={<FormattedMessage id={'feiloppsummering.tittel'} />}>
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
        </UiIntlProvider>
    );
};

export default ErrorSummaryFp;
