import * as React from 'react';
import { BrowserInfo, detect } from 'detect-browser';
import Api from '../../../app/api/api';
import { Feature, isFeatureEnabled } from '../../Feature';
import GenerellFeil from 'app/connected-components/sider/feilsider/GenerellFeil';

interface State {
    hasError: boolean;
    browser: BrowserInfo | null | boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.logError = this.logError.bind(this);
    }

    componentDidCatch(error: Error | null, reactStackTrace: object) {
        this.setState({ hasError: true }, () => {
            if (isFeatureEnabled(Feature.logging)) {
                this.logError(error, detect(), reactStackTrace);
            }
        });
    }

    logError(error: Error | null | undefined, browserInfo: BrowserInfo | null | false, reactStackTrace?: any) {
        Api.log({
            message: error ? error.message : undefined,
            trace: error ? error.stack : undefined,
            componentStack:
                reactStackTrace && reactStackTrace.componentStack ? reactStackTrace.componentStack : undefined,
            browserInfo
        });
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return <GenerellFeil />;
    }
}
export default ErrorBoundary;
