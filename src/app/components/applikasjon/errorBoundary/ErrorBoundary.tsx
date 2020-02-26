import * as React from 'react';
import { BrowserInfo, detect, BotInfo, NodeInfo } from 'detect-browser';
import { isFeatureEnabled, Feature } from 'app/Feature';
import Api from 'app/api/api';
import * as Sentry from '@sentry/browser';

interface State {
    eventId: string | null;
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null };
        this.logError = this.logError.bind(this);
    }

    componentDidCatch(error: Error | null, errorInfo: object) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });

        if (isFeatureEnabled(Feature.logging)) {
            this.logError(error, detect(), errorInfo);
        }
    }

    logError(
        error: Error | null | undefined,
        browserInfo: BrowserInfo | BotInfo | NodeInfo | null,
        reactStackTrace?: any
    ) {
        Api.log({
            message: error ? error.message : undefined,
            trace: error ? error.stack : undefined,
            componentStack:
                reactStackTrace && reactStackTrace.componentStack ? reactStackTrace.componentStack : undefined,
            browserInfo
        });
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
