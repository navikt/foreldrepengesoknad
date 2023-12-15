import { useEffect, useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Kvittering, LocaleAll } from '@navikt/fp-types';
import { ApiAccessError, ApiGeneralError, createApi } from '@navikt/fp-api';
import { redirect, redirectToLogin } from '@navikt/fp-utils';
import { ErrorPage } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType } from 'appData/EsDataContext';
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
import useEsMellomlagring, { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';

export const esApi = createApi(Environment.REST_API_URL);

export const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const ApiErrorHandler: React.FunctionComponent<{ error: ApiAccessError | ApiGeneralError }> = ({ error }) => {
    if (error instanceof ApiAccessError) {
        redirectToLogin(Environment.LOGIN_URL);
        return <Spinner />;
    }
    return <ErrorPage appName="Engangsstønad" errorMessage={error.message} retryCallback={() => location.reload()} />;
};

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
    person: Person;
    mellomlagretData?: EsDataMapAndMetaData;
}

const EngangsstønadRoutes: React.FunctionComponent<Props> = ({ locale, onChangeLocale, person, mellomlagretData }) => {
    const navigate = useNavigate();

    const [erVelkommen, setVelkommen] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(esApi, locale, setKvittering);
    const { mellomlagreOgNaviger, errorMellomlagre } = useEsMellomlagring(esApi, locale, setVelkommen);

    useEffect(() => {
        if (mellomlagretData && mellomlagretData[ContextDataType.CURRENT_PATH]) {
            setVelkommen(true);
            if (mellomlagretData.locale) {
                onChangeLocale(mellomlagretData.locale);
            }
            navigate(mellomlagretData[ContextDataType.CURRENT_PATH]);
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

    if (errorSendSøknad || errorMellomlagre) {
        return <ApiErrorHandler error={notEmpty(errorSendSøknad || errorMellomlagre)} />;
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
                        element={
                            <OppsummeringSteg
                                person={person}
                                sendSøknad={sendSøknad}
                                mellomlagreOgNaviger={mellomlagreOgNaviger}
                            />
                        }
                    />
                </>
            )}
        </Routes>
    );
};

export default EngangsstønadRoutes;
