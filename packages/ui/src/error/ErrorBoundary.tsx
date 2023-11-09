import * as Sentry from '@sentry/browser';
import { Component } from 'react';
import ErrorPage from './ErrorPage';

interface Props {
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    children: React.ReactNode;
    tryAgainCallback: () => void;
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
        const { appName, tryAgainCallback } = this.props;
        const { errorMessage, errorInfo } = this.state;

        if (this.state.hasError) {
            return errorMessage ? (
                <ErrorPage appName={appName} errorMessage={errorMessage} tryAgainCallback={tryAgainCallback} />
            ) : (
                <div>{errorMessage || errorInfo}</div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
