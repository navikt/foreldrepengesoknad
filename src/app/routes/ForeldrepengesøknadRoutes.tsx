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
import UttaksplanStep from 'app/steps/uttaksplan/UttaksplanStep';
import React, { FunctionComponent, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import SøknadSendt from '../pages/søknadSendt/SøknadSendt';
import SøknadRoutes from './routes';

interface Props {
    fornavn: string;
    locale: Locale;
    kjønn: Kjønn;
    onChangeLocale: (locale: Locale) => void;
    currentRoute: SøknadRoutes;
}

const renderSøknadRoutes = (harGodkjentVilkår: boolean, erEndringssøknad: boolean, kjønn: Kjønn) => {
    if (!harGodkjentVilkår) {
        return <Redirect to={SøknadRoutes.VELKOMMEN} exact={true} />;
    }

    if (erEndringssøknad) {
        return (
            <>
                <Route path={SøknadRoutes.UTTAKSPLAN}>
                    <UttaksplanStep />
                </Route>
                <Route path={SøknadRoutes.OPPSUMMERING}>
                    <Oppsummering />
                </Route>
                <Route path={SøknadRoutes.SØKNAD_SENDT}>
                    <SøknadSendt />
                </Route>
            </>
        );
    }

    return (
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
                <UttaksplanStep />
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
            <Route path={SøknadRoutes.SØKNAD_SENDT}>
                <SøknadSendt />
            </Route>
        </>
    );
};

const ForeldrepengesøknadRoutes: FunctionComponent<Props> = ({
    fornavn,
    locale,
    kjønn,
    onChangeLocale,
    currentRoute,
}) => {
    const { state } = useForeldrepengesøknadContext();
    const history = useHistory();

    useEffect(() => {
        history.push(currentRoute);
    }, []);

    return (
        <>
            <Route path={SøknadRoutes.VELKOMMEN} exact={true}>
                <Velkommen
                    fornavn={fornavn}
                    locale={locale}
                    saker={state.saker}
                    onChangeLocale={onChangeLocale}
                    fnr={state.søkerinfo.person.fnr}
                />
            </Route>
            {renderSøknadRoutes(state.søknad.harGodkjentVilkår, state.søknad.erEndringssøknad, kjønn)}
        </>
    );
};

export default ForeldrepengesøknadRoutes;
