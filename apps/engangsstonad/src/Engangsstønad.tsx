import { useEffect, useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { ApiAccessError, createApi, useRequest } from '@navikt/fp-api';
import { erMyndig, redirect, redirectToLogin } from '@navikt/fp-utils';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { EsDataContext, EsDataMap, EsDataType } from 'appData/EsDataContext';
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
import useEsMellomlagring from 'appData/useEsMellomlagring';

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
    const navigate = useNavigate();
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { data: person, loading: loadingPerson, error: errorHentPerson } = useRequest<Person>(esApi, '/personinfo');
    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<EsDataMap>(esApi, '/storage/engangstønad');

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(esApi, locale, setKvittering);
    const { mellomlagreOgNaviger, errorMellomlagre } = useEsMellomlagring(esApi);

    const [erVelkommen, setVelkommen] = useState(false);

    useEffect(() => {
        if (mellomlagretData && mellomlagretData[EsDataType.CURRENT_PATH]) {
            setVelkommen(true);
            navigate(mellomlagretData[EsDataType.CURRENT_PATH]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mellomlagretData]);

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

    if (errorHentPerson || errorSendSøknad || errorMellomlagretData || errorMellomlagre) {
        const error = notEmpty(errorHentPerson || errorSendSøknad || errorMellomlagretData || errorMellomlagre);
        if (error instanceof ApiAccessError) {
            redirectToLogin(Environment.LOGIN_URL);
            return <Spinner />;
        }
        return (
            <ErrorPage appName="Engangsstønad" errorMessage={error.message} retryCallback={() => location.reload()} />
        );
    }

    if (loadingPerson || !person || loadingMellomlagretData) {
        return <Spinner />;
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    return (
        <EsDataContext initialState={mellomlagretData}>
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
                            mellomlagreOgNaviger={mellomlagreOgNaviger}
                        />
                    }
                />
                {erVelkommen && (
                    <>
                        <Route
                            path={Path.SØKERSITUASJON}
                            element={<SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.OM_BARNET}
                            element={<OmBarnetSteg kjønn={person.kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.TERMINBEKREFTELSE}
                            element={<DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.ADOPSJONSBEKREFTELSE}
                            element={<DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.UTENLANDSOPPHOLD}
                            element={<UtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.TIDLIGERE_UTENLANDSOPPHOLD}
                            element={<TidligereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
                        <Route
                            path={Path.SENERE_UTENLANDSOPPHOLD}
                            element={<SenereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />}
                        />
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
