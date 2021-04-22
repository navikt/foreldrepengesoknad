import { Kjønn, Locale } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Velkommen from 'app/pages/velkommen/Velkommen';
import Søkersituasjon from 'app/steps/søkersituasjon/Søkersituasjon';
import React, { FunctionComponent } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import SøknadRoutes from './routes';

interface Props {
    fornavn: string;
    locale: Locale;
    kjønn: Kjønn;
    onChangeLocale: any;
}

const ForeldrepengesøknadRoutes: FunctionComponent<Props> = ({ fornavn, locale, kjønn, onChangeLocale }) => {
    const { state } = useForeldrepengesøknadContext();

    return (
        <Router>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                exact={true}
                component={() => <Velkommen fornavn={fornavn} locale={locale} onChangeLocale={onChangeLocale} />}
            />
            {!state.søknad.velkommen.harForståttRettigheterOgPlikter ? (
                <Redirect to={SøknadRoutes.VELKOMMEN} exact={true} />
            ) : (
                <>
                    <Route path={SøknadRoutes.SØKERSITUASJON} component={() => <Søkersituasjon kjønn={kjønn} />} />
                </>
            )}
        </Router>
    );
};

export default ForeldrepengesøknadRoutes;
