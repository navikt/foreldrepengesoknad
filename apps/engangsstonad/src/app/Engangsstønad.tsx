import React from 'react';
import { Loader } from '@navikt/ds-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Velkommen from './pages/velkommen/Velkommen';
import { useRequest } from './api/apiHooks';
import Api from './api/api';
import Person from './types/domain/Person';
import { erMyndig, intlUtils, Locale } from '@navikt/fp-common';
import OmBarnet from './steps/om-barnet/OmBarnet';
import Utenlandsopphold from './steps/utenlandsopphold/Utenlandsopphold';
import Oppsummering from './steps/oppsummering/Oppsummering';
import { useEngangsstønadContext } from './context/hooks/useEngangsstønadContext';
import Umyndig from './pages/umyndig/Umyndig';
import SøknadSendt from './pages/soknadSendt/SøknadSendt';
import Søkersituasjon from './steps/sokersituasjon/Søkersituasjon';
import Feilside from './components/feilside/Feilside';
import { useIntl } from 'react-intl';
import { lenker } from './util/lenker';

interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data, loading, error } = useRequest<Person>(Api.getPerson());
    const { state } = useEngangsstønadContext();
    const intl = useIntl();

    if (error !== null) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            return renderSpinner();
        }

        return (
            <Feilside
                dokumenttittel="NAV Engangsstønad"
                ingress=""
                tittel=""
                illustrasjon={{
                    tittel: intlUtils(intl, 'intro.generellFeil.tittel'),
                    tekst: intlUtils(intl, 'intro.generellFeil.ingress'),
                    veileder: {
                        ansikt: 'skeptisk',
                    },
                    lenke: { tekst: intlUtils(intl, 'intro.generellFeil.brukerstøtte'), url: lenker.brukerstøtte },
                }}
                setLanguage={onChangeLocale}
                språkkode={locale}
            />
        );
    }

    if (loading || !data) {
        return renderSpinner();
    }

    return (
        <>
            {!erMyndig(data.fødselsdato) ? (
                <Umyndig person={data} />
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Velkommen fornavn={data.fornavn} locale={locale} onChangeLocale={onChangeLocale} />
                            }
                        />
                        {!state.søknad.velkommen.harForståttRettigheterOgPlikter ? (
                            <Route path="*" element={<Navigate to="/" />} />
                        ) : (
                            <>
                                <Route path="/soknad/søkersituasjon" element={<Søkersituasjon />} />
                                <Route path="/soknad/om-barnet" element={<OmBarnet person={data} />} />
                                <Route path="/soknad/utenlandsopphold" element={<Utenlandsopphold />} />
                                <Route
                                    path="/soknad/oppsummering"
                                    element={<Oppsummering person={data} locale={locale} />}
                                />
                                <Route path="/kvittering" element={<SøknadSendt person={data} />} />
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
};

export default Engangsstønad;
