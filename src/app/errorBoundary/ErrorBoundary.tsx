import React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
    eventId: string | null;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        this.setState({ ...this.state, hasError: true });

        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
