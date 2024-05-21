import * as Sentry from '@sentry/browser';
import { Component, ReactElement } from 'react';

import ErrorPage, { AppName } from './ErrorPage';

interface Props {
    appName: AppName;
    children: React.ReactNode;
    retryCallback?: () => void;
    customErrorPage?: ReactElement;
}

interface State {
    eventId: string | null;
    hasError: boolean;
    errorInfo: any;
    errorMessage: string | undefined;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null, hasError: false, errorInfo: null, errorMessage: undefined };
    }

    componentDidCatch(error: Error | null, errorInfo: any) {
        Sentry.withScope((scope: any) => {
            scope.setExtras(errorInfo);
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
            return <div>{errorMessage || errorInfo}</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
