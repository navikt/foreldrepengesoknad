import * as React from 'react';
import { BrowserInfo, detect } from 'detect-browser';
import Api from '../../../app/api/api';
import { Feature, isFeatureEnabled } from '../../Feature';

interface State {
    browser: BrowserInfo | null | boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.logError = this.logError.bind(this);
    }

    componentDidCatch(error: Error | null, reactStackTrace: object) {
        if (isFeatureEnabled(Feature.logging)) {
            this.logError(error, detect(), reactStackTrace);
        }
    }

    logError(error: Error | null | undefined, browserInfo: BrowserInfo | null | false, reactStackTrace?: object) {
        Api.log({
            message: error ? error.message : undefined,
            trace: error ? error.stack : undefined,
            reactStackTrace,
            browserInfo
        });
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
