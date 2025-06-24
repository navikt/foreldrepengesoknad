import * as Sentry from '@sentry/browser';
import { Component, ErrorInfo } from 'react';

type Props = {
    children: React.ReactNode;
};

interface State {
    error: Error | null;
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: ErrorInfo): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState((oldState) => ({ ...oldState, hasError: true, error }));

            Sentry.withScope((scope) => {
                scope.setExtra('errorInfo', errorInfo);
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
