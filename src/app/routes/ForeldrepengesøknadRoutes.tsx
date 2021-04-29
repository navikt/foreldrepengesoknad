import { Kjønn, Locale } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Velkommen from 'app/pages/velkommen/Velkommen';
import OmBarnet from 'app/steps/om-barnet/OmBarnet';
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
            <Route path={SøknadRoutes.VELKOMMEN} exact={true}>
                <Velkommen fornavn={fornavn} locale={locale} onChangeLocale={onChangeLocale} />
            </Route>
            {!state.søknad.harGodkjentVilkår ? (
                <Redirect to={SøknadRoutes.VELKOMMEN} exact={true} />
            ) : (
                <>
                    <Route path={SøknadRoutes.SØKERSITUASJON}>
                        <Søkersituasjon kjønn={kjønn} />
                    </Route>
                    <Route path={SøknadRoutes.OMBARNET}>
                        <OmBarnet />
                    </Route>
                </>
            )}
        </Router>
    );
};

export default ForeldrepengesøknadRoutes;
