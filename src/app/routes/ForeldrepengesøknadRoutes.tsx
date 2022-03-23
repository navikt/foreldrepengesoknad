import { intlUtils, Kjønn, Locale } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import links from 'app/links/links';
import Feilside from 'app/pages/feilside/Feilside';
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
import { useIntl } from 'react-intl';
import { Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import SøknadSendt from '../pages/søknadSendt/SøknadSendt';
import SøknadRoutes from './routes';

interface Props {
    fornavn: string;
    locale: Locale;
    kjønn: Kjønn;
    onChangeLocale: (locale: Locale) => void;
    currentRoute: SøknadRoutes;
}

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    erEndringssøknad: boolean,
    søkerErMyndig: boolean,
    kjønn: Kjønn
) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!søkerErMyndig) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />;
    }

    if (erEndringssøknad) {
        return (
            <>
                <Route path={SøknadRoutes.UTTAKSPLAN} element={<UttaksplanStep />} />
                <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
                <Route path={SøknadRoutes.SØKNAD_SENDT} element={<SøknadSendt />} />
            </>
        );
    }

    return (
        <>
            <Route path={SøknadRoutes.SØKERSITUASJON} element={<Søkersituasjon kjønn={kjønn} />} />
            <Route path={SøknadRoutes.OM_BARNET} element={<OmBarnet />} />
            <Route path={SøknadRoutes.ANNEN_FORELDER} element={<AnnenForelder />} />
            <Route path={SøknadRoutes.UTTAKSPLAN_INFO} element={<UttaksplanInfo />} />
            <Route path={SøknadRoutes.UTTAKSPLAN} element={<UttaksplanStep />} />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            <Route path={SøknadRoutes.INNTEKTSINFORMASJON} element={<Inntektsinformasjon />} />
            <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
            <Route path={SøknadRoutes.SØKNAD_SENDT} element={<SøknadSendt />} />
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
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        if (currentRoute) {
            navigate(currentRoute);
        }
    }, [navigate, currentRoute]);

    return (
        <Routes>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                element={
                    <Velkommen
                        fornavn={fornavn}
                        locale={locale}
                        saker={state.saker}
                        onChangeLocale={onChangeLocale}
                        fnr={state.søkerinfo.person.fnr}
                    />
                }
            />
            <Route
                path={SøknadRoutes.IKKE_MYNDIG}
                element={
                    <Feilside
                        dokumenttittel="NAV Foreldrepengesøknad"
                        ingress={intlUtils(intl, 'velkommen.ingress')}
                        tittel={intlUtils(intl, 'velkommen.tittel')}
                        illustrasjon={{
                            tittel: intlUtils(intl, 'velkommen.ikkeMyndig.tittel', {
                                navn: state.søkerinfo.person.fornavn.toLowerCase(),
                            }),
                            tekst: intlUtils(intl, 'velkommen.ikkeMyndig.ingress'),
                            veileder: {
                                ansikt: 'skeptisk',
                            },
                            lenke: {
                                tekst: intlUtils(intl, 'velkommen.ikkeMyndig.boblelenketekst'),
                                url: links.papirsøknad,
                            },
                        }}
                    />
                }
            />

            {renderSøknadRoutes(
                state.søknad.harGodkjentVilkår,
                state.søknad.erEndringssøknad,
                state.søkerinfo.person.erMyndig,
                kjønn
            )}
        </Routes>
    );
};

export default ForeldrepengesøknadRoutes;
