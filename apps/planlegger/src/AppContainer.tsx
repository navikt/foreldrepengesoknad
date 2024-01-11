import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@navikt/fp-ui';
import IntlProvider from './intl/IntlProvider';
import Planlegger from './Planlegger';

const AppContainer = () => {
    return (
        <IntlProvider språkkode="nb">
            <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                <BrowserRouter>
                    <Planlegger />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
