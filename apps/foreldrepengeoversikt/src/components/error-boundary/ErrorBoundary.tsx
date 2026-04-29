import { Component } from 'react';

import { captureException } from '@navikt/fp-observability';

import { ErrorAlert } from './ErrorAlert';

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

    componentDidCatch(error: Error | null): void {
        if (error && error.message !== 'globalThis.hasFocus is not a function') {
            this.setState((oldState) => ({ ...oldState, hasError: true, error }));
            captureException(error);
        }
    }

    render() {
        if (this.state.hasError) {
            return <ErrorAlert>{this.state.error?.message}</ErrorAlert>;
        }

        return this.props.children;
    }
}
