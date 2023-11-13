import { useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LocaleAll } from '@navikt/fp-types';
import { useRequest } from '@navikt/fp-api';
import { erMyndig, redirect } from '@navikt/fp-utils';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';

import Api from 'appData/api';
import { Path } from 'appData/paths';
import Environment from 'appData/Environment';
import Kvittering from 'types/Kvittering';
import Person from './types/Person';
import SøkersituasjonSteg from './steg/sokersituasjon/SøkersituasjonSteg';
import Velkommen from './velkommen/Velkommen';
import OmBarnetSteg from './steg/omBarnet/OmBarnetSteg';
import UtenlandsoppholdSteg from './steg/utenlandsopphold/UtenlandsoppholdSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import DokumentasjonSteg from './steg/dokumentasjon/DokumentasjonSteg';
import SenereUtenlandsoppholdSteg from './steg/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from './steg/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import useEsSendData from 'appData/useEsSendData';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const [erVelkommen, setVelkommen] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { data: person, loading, error } = useRequest<Person>(Api.getPerson);

    const sendSøknad = useEsSendData(locale, setKvittering);

    if (kvittering) {
        if (Environment.INNSYN) {
            redirect(
                kvittering.saksNr
                    ? `${Environment.INNSYN}/sak/${kvittering.saksNr}/redirectFromSoknad`
                    : `${Environment.INNSYN}/redirectFromSoknad`,
            );
            return <Spinner />;
        }
        return <div>Redirected to Innsyn</div>;
    }

    if (error !== null) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            return <Spinner />;
        }
        return (
            <ErrorPage appName="Engangsstønad" errorMessage={error.message} retryCallback={() => location.reload()} />
        );
    }

    if (loading || !person) {
        return <Spinner />;
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    return (
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
    );
};

export default Engangsstønad;
