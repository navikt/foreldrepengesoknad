import React from 'react';
import * as Sentry from '@sentry/browser';

interface Props {
    children: React.ReactNode;
}

interface State {
    eventId: string | null;
    hasError: boolean;
    errorInfo: any;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null, hasError: false, errorInfo: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId, errorInfo });
        });
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <div>{this.state.errorInfo}</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
