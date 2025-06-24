import * as Sentry from '@sentry/browser';
import { Component, ErrorInfo, ReactElement } from 'react';

import { AppName } from '@navikt/fp-types';

import { ErrorPage } from './ErrorPage';

interface Props {
    appName: AppName;
    children: React.ReactNode;
    retryCallback?: () => void;
    customErrorPage?: ReactElement;
}

interface State {
    eventId: string | null;
    hasError: boolean;
    errorInfo: ErrorInfo | null;
    errorMessage: string | undefined;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { eventId: null, hasError: false, errorInfo: null, errorMessage: undefined };
    }

    componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
        Sentry.withScope((scope) => {
            scope.setExtra('errorInfo', errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId, errorInfo });
        });
        this.setState({ hasError: true, errorMessage: error?.message });
    }

    render() {
        const { appName, retryCallback, customErrorPage } = this.props;
        const { errorMessage, errorInfo } = this.state;

        if (this.state.hasError) {
            if (customErrorPage) {
                return customErrorPage;
            }
            if (errorMessage && retryCallback) {
                return <ErrorPage appName={appName} errorMessage={errorMessage} retryCallback={retryCallback} />;
            }
            return <div>{errorMessage ?? errorInfo?.componentStack}</div>;
        }
        return this.props.children;
    }
}
