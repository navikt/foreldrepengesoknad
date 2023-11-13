import { useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { ApiAccessError, createApi, useRequest } from '@navikt/fp-api';
import { erMyndig, redirect, redirectToLogin } from '@navikt/fp-utils';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { Path } from 'appData/paths';
import Environment from 'appData/Environment';
import Person from './types/Person';
import SøkersituasjonSteg from './steg/sokersituasjon/SøkersituasjonSteg';
import Velkommen from './velkommen/Velkommen';
import OmBarnetSteg from './steg/omBarnet/OmBarnetSteg';
import UtenlandsoppholdSteg from './steg/utenlandsopphold/UtenlandsoppholdSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import DokumentasjonSteg from './steg/dokumentasjon/DokumentasjonSteg';
import SenereUtenlandsoppholdSteg from './steg/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from './steg/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import useEsSendSøknad from 'appData/useEsSendSøknad';

export const esApi = createApi(Environment.REST_API_URL);

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

    const { data: person, loading, error: errorHentPerson } = useRequest<Person>(esApi, '/personinfo');

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(esApi, locale, setKvittering);

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

    if (errorHentPerson || errorSendSøknad) {
        const error = notEmpty(errorHentPerson || errorSendSøknad);
        if (error instanceof ApiAccessError) {
            redirectToLogin(Environment.LOGIN_URL);
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
