import * as Sentry from '@sentry/browser';
import { Component } from 'react';
import ErrorPage from './ErrorPage';

interface Props {
    appnavn: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    children: React.ReactNode;
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
        const { appnavn } = this.props;
        const { errorMessage, errorInfo } = this.state;

        if (this.state.hasError) {
            return errorMessage ? (
                <ErrorPage appnavn={appnavn} feilmelding={errorMessage} søkPåNytt={() => location.reload()} />
            ) : (
                <div>{errorMessage || errorInfo}</div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
