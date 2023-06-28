import { FunctionComponent } from 'react';
import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import IntlProvider from './intl/IntlProvider';
import dayjs from 'dayjs';
import ByttBrowserModal from '@navikt/fp-common/src/common/pages/byttBrowserModal/ByttBrowserModal';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { shouldChangeBrowser } from '@navikt/fp-common/src/common/utils/browserUtils';
import SvangerskapspengerContextProvider from './context/SvangerskapspengerContext';

dayjs.locale('nb');

const AppContainer: FunctionComponent = () => {
    return (
        <SvangerskapspengerContextProvider>
            <ErrorBoundary>
                <IntlProvider locale="nb">
                    <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                    <Svangerskapspengesøknad />
                </IntlProvider>
            </ErrorBoundary>
        </SvangerskapspengerContextProvider>
    );
};

export default AppContainer;
