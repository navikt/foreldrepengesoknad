import React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
    error: Error | null;
    eventId: string | null;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });

            Sentry.withScope((scope) => {
                scope.setExtras(errorInfo);
                const eventId = Sentry.captureException(error);
                this.setState({ eventId });
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', maxWidth: '704px', margin: '0 auto' }}>{this.state.error?.message}</div>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
