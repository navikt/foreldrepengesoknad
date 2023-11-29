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
    } = useRequest<EsDataMap>(esApi, '/storage');

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(esApi, locale, setKvittering);

    const [erVelkommen, setVelkommen] = useState(mellomlagretData !== undefined);

    useEffect(() => {
        if (mellomlagretData && mellomlagretData[EsDataType.CURRENT_PATH]) {
            navigate(mellomlagretData[EsDataType.CURRENT_PATH]);
        }
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

    if (errorHentPerson || errorSendSøknad || errorMellomlagretData) {
        const error = notEmpty(errorHentPerson || errorSendSøknad || errorMellomlagretData);
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
