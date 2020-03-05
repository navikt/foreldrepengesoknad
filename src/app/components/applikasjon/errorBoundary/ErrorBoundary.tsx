import * as React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
    eventId: string | null;
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null };
    }

    componentDidCatch(error: Error | null, errorInfo: object) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
