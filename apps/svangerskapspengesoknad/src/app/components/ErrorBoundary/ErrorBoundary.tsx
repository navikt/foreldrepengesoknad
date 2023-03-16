import { ReactElement, Component } from 'react';
import * as Sentry from '@sentry/browser';

interface Props {
    children: ReactElement;
}

class ErrorBoundary extends Component<Props> {
    constructor(props: Props) {
        super(props);
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
