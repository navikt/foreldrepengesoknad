import { Kjønn, Locale } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Velkommen from 'app/pages/velkommen/Velkommen';
import AnnenForelder from 'app/steps/annen-forelder/AnnenForelder';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import OmBarnet from 'app/steps/om-barnet/OmBarnet';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import Søkersituasjon from 'app/steps/søkersituasjon/Søkersituasjon';
import Utenlandsopphold from 'app/steps/utenlandsopphold/Utenlandsopphold';
import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import Uttaksplan from 'app/steps/uttaksplan/Uttaksplan';
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
                    <Route path={SøknadRoutes.OM_BARNET}>
                        <OmBarnet />
                    </Route>
                    <Route path={SøknadRoutes.ANNEN_FORELDER}>
                        <AnnenForelder />
                    </Route>
                    <Route path={SøknadRoutes.UTTAKSPLAN_INFO}>
                        <UttaksplanInfo />
                    </Route>
                    <Route path={SøknadRoutes.UTTAKSPLAN}>
                        <Uttaksplan />
                    </Route>
                    <Route path={SøknadRoutes.UTENLANDSOPPHOLD}>
                        <Utenlandsopphold />
                    </Route>
                    <Route path={SøknadRoutes.INNTEKTSINFORMASJON}>
                        <Inntektsinformasjon />
                    </Route>
                    <Route path={SøknadRoutes.OPPSUMMERING}>
                        <Oppsummering />
                    </Route>
                </>
            )}
        </Router>
    );
};

export default ForeldrepengesøknadRoutes;
