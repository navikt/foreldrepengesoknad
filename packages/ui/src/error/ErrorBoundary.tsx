import { Component, ErrorInfo, ReactElement } from 'react';

import { captureException } from '@navikt/fp-observability';
import { AppName } from '@navikt/fp-types';

import { ErrorPage } from './ErrorPage';

interface Props {
    appName: AppName;
    children: React.ReactNode;
    retryCallback?: () => void;
    customErrorPage?: ReactElement;
    /**
     * Lar forbrukaren vise ei eiga side for spesifikke feiltypar (t.d. 403 "umyndig"), ved å
     * returnere eit ReactElement for den fanga feilen. Returnerer funksjonen `undefined` fell
     * komponenten tilbake til `customErrorPage` / standard `ErrorPage`.
     */
    getErrorPage?: (error: Error) => ReactElement | undefined;
}

interface State {
    hasError: boolean;
    errorInfo: ErrorInfo | null;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, errorInfo: null, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
        captureException(error);
        this.setState({ hasError: true, errorInfo, error });
    }

    render() {
        const { appName, retryCallback, customErrorPage, getErrorPage } = this.props;
        const { error, errorInfo } = this.state;

        if (this.state.hasError) {
            const errorPageFromError = error && getErrorPage ? getErrorPage(error) : undefined;
            if (errorPageFromError) {
                return errorPageFromError;
            }
            if (customErrorPage) {
                return customErrorPage;
            }
            if (error?.message && retryCallback) {
                return <ErrorPage appName={appName} errorMessage={error.message} retryCallback={retryCallback} />;
            }
            return <div>{error?.message ?? errorInfo?.componentStack}</div>;
        }
        return this.props.children;
    }
}
