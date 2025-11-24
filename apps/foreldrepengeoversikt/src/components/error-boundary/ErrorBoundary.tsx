import * as Sentry from '@sentry/browser';
import { Component, ErrorInfo } from 'react';

import { Alert } from '@navikt/ds-react';

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
        if (error && error.message !== 'globalThis.hasFocus is not a function') {
            this.setState((oldState) => ({ ...oldState, hasError: true, error }));

            Sentry.withScope((scope) => {
                scope.setExtra('errorInfo', errorInfo);
                Sentry.captureException(error);
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert variant="info" className="m-8 ml-auto mr-auto w-[704px]">
                    {this.state.error?.message}
                </Alert>
            );
        }

        return this.props.children;
    }
}
