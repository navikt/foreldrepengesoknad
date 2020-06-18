import * as React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
    eventId: string | null;
}

class ErrorBoundary extends React.Component<unknown, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render(): React.ReactNode {
        return this.props.children;
    }
}
export default ErrorBoundary;
