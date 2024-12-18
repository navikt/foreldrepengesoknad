import * as Sentry from '@sentry/browser';
import { Component } from 'react';

interface State {
    error: Error | null;
    hasError: boolean;
}

export class ErrorBoundary extends Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState((oldState) => ({ ...oldState, hasError: true, error }));

            Sentry.withScope((scope) => {
                scope.setExtras(errorInfo);
                Sentry.captureException(error);
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return <div className="p-8 w-[704px] m-0 ml-auto mr-auto">{this.state.error?.message}</div>;
        }

        return this.props.children;
    }
}
