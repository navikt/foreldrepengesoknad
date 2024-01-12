import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import Planlegger from './Planlegger';
import nnMessages from './intl/messages/nn_NO.json';
import nbMessages from './intl/messages/nb_NO.json';
import { useState } from 'react';
import { LocaleNo } from '@navikt/fp-types';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages },
    nn: { ...nnMessages },
};

const AppContainer = () => {
    const [locale] = useState<LocaleNo>('nb');

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                <BrowserRouter>
                    <Planlegger />
                </BrowserRouter>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
