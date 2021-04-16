import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import Api from './api/api';
import { useForeldrepengesøknadContext } from './context/hooks/useForeldrepengesøknadContext';
import Velkommen from './pages/velkommen/Velkommen';

interface Props {
    locale: Locale;
    onChangeLocale: any;
}

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <NavFrontendSpinner type="XXL" />
    </div>
);

const Foreldrepengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data } = useSWR('/sokerinfo', (url) => Api.getSøkerinfo(url));
    const { state } = useForeldrepengesøknadContext();

    console.log(data);

    if (!data) {
        return renderSpinner();
    }

    return (
        <Router>
            <Route
                path="/"
                exact={true}
                component={() => (
                    <Velkommen fornavn={data.søker.fornavn} locale={locale} onChangeLocale={onChangeLocale} />
                )}
            />
            {!state.søknad.velkommen.harForståttRettigheterOgPlikter ? (
                <Redirect to="/" exact={true} />
            ) : (
                <>
                    <Route
                        path="/soknad/søkersituasjon"
                        component={() => (
                            <Velkommen fornavn={data.søker.fornavn} locale={locale} onChangeLocale={onChangeLocale} />
                        )}
                    />
                </>
            )}
        </Router>
    );
};

export default Foreldrepengesøknad;
