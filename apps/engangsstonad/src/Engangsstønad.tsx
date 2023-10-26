import { useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Locale } from '@navikt/fp-common';
import SøkersituasjonSteg from './sider/steg/sokersituasjon/SøkersituasjonSteg';
import Velkommen from './sider/velkommen/Velkommen';
import OmBarnetSteg from './sider/steg/omBarnet/OmBarnetSteg';
import UtenlandsoppholdSteg from './sider/steg/utenlandsopphold/UtenlandsoppholdSteg';
import { useRequest } from '@navikt/fp-api';
import Api from 'appData/api';
import Person from './types/Person';
import Umyndig from './sider/umyndig/Umyndig';
import OppsummeringSteg from './sider/steg/oppsummering/OppsummeringSteg';
import DokumentasjonSteg from './sider/steg/dokumentasjon/DokumentasjonSteg';
import { Path } from 'appData/paths';
import { EsDataContext } from 'appData/EsDataContext';
import Kvittering from 'types/Kvittering';
import SenereUtenlandsoppholdSteg from './sider/steg/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from './sider/steg/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import { erMyndig, redirect } from '@navikt/fp-utils';
import Environment from 'appData/Environment';
import { ErrorPage } from '@navikt/fp-ui';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const [erVelkommen, setVelkommen] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { data: person, loading, error } = useRequest<Person>(Api.getPerson);

    if (kvittering) {
        if (Environment.INNSYN_SAK) {
            redirect(kvittering.saksNr ? `${Environment.INNSYN_SAK}${kvittering.saksNr}` : Environment.INNSYN);
            return <Spinner />;
        }
        return <div>Redirected to Innsyn</div>;
    }

    if (error !== null) {
        //TODO Kva er logikken med å visa spinner ved 401/403?
        if (error.response?.status === 401 || error.response?.status === 403) {
            return <Spinner />;
        }
        return <ErrorPage appnavn="Engangsstønad" feilmelding={error.message} />;
    }

    if (loading || !person) {
        return <Spinner />;
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig person={person} />;
    }

    const sendSøknad = Api.sendSøknad(locale, setKvittering);

    return (
        <EsDataContext>
            <Routes>
                {!erVelkommen && <Route path="*" element={<Navigate to={Path.VELKOMMEN} />} />}
                <Route
                    path={Path.VELKOMMEN}
                    element={
                        <Velkommen
                            locale={locale}
                            onChangeLocale={onChangeLocale}
                            startSøknad={setVelkommen}
                            erVelkommen={erVelkommen}
                        />
                    }
                />
                {erVelkommen && (
                    <>
                        <Route path={Path.SØKERSITUASJON} element={<SøkersituasjonSteg />} />
                        <Route path={Path.OM_BARNET} element={<OmBarnetSteg kjønn={person.kjønn} />} />
                        <Route path={Path.TERMINBEKREFTELSE} element={<DokumentasjonSteg />} />
                        <Route path={Path.ADOPSJONSBEKREFTELSE} element={<DokumentasjonSteg />} />
                        <Route path={Path.UTENLANDSOPPHOLD} element={<UtenlandsoppholdSteg />} />
                        <Route path={Path.TIDLIGERE_UTENLANDSOPPHOLD} element={<TidligereUtenlandsoppholdSteg />} />
                        <Route path={Path.SENERE_UTENLANDSOPPHOLD} element={<SenereUtenlandsoppholdSteg />} />
                        <Route
                            path={Path.OPPSUMMERING}
                            element={<OppsummeringSteg person={person} sendSøknad={sendSøknad} />}
                        />
                    </>
                )}
            </Routes>
        </EsDataContext>
    );
};

export default Engangsstønad;
