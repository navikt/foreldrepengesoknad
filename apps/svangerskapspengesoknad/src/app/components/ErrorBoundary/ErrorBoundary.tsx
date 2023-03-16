import { ReactElement, Component } from 'react';
import * as Sentry from '@sentry/browser';

interface Props {
    children: ReactElement;
}

interface State {
    eventId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { eventId: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            Sentry.captureException(error);
        });
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
