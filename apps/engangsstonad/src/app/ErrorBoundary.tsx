import React from 'react';
import * as Sentry from '@sentry/browser';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    errorInfo: any;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            Sentry.captureException(error);
            this.setState({ errorInfo });
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
