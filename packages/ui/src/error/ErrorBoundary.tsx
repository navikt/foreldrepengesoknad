import * as Sentry from '@sentry/browser';
import { Component } from 'react';

interface Props {
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
        if (this.state.hasError) {
            return <div>{this.state.errorMessage || this.state.errorInfo}</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
