import Environment from 'appData/Environment';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { EsDataMapAndMetaData, useEsMellomlagring } from 'appData/useEsMellomlagring';
import { useEsSendSøknad } from 'appData/useEsSendSøknad';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Kvittering, PersonFrontend } from '@navikt/fp-types';
import { ErrorPage, Spinner } from '@navikt/fp-ui';
import { redirect } from '@navikt/fp-utils';

import { DokumentasjonSteg } from './steg/dokumentasjon/DokumentasjonSteg';
import { OmBarnetSteg } from './steg/om-barnet/OmBarnetSteg';
import { OppsummeringSteg } from './steg/oppsummering/OppsummeringSteg';
import { SøkersituasjonSteg } from './steg/sokersituasjon/SøkersituasjonSteg';
import { SenereUtenlandsoppholdSteg } from './steg/utenlandsopphold-senere/SenereUtenlandsoppholdSteg';
import { TidligereUtenlandsoppholdSteg } from './steg/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg';
import { UtenlandsoppholdSteg } from './steg/utenlandsopphold/UtenlandsoppholdSteg';
import { Velkommen } from './velkommen/Velkommen';

export const ApiErrorHandler = ({ error }: { error: Error }) => {
    return <ErrorPage appName="engangsstonad" errorMessage={error.message} retryCallback={() => location.reload()} />;
};

interface Props {
    personinfo: PersonFrontend;
    mellomlagretData?: EsDataMapAndMetaData;
}

export const EngangsstønadRoutes = ({ personinfo, mellomlagretData }: Props) => {
    const navigate = useNavigate();

    const [erVelkommen, setErVelkommen] = useState(false);
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(setKvittering);
    const mellomlagreOgNaviger = useEsMellomlagring(personinfo, setErVelkommen);

    useEffect(() => {
        if (mellomlagretData?.[ContextDataType.CURRENT_PATH]) {
            setErVelkommen(true);
            navigate(mellomlagretData[ContextDataType.CURRENT_PATH]);
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

    if (errorSendSøknad) {
        return <ApiErrorHandler error={errorSendSøknad} />;
    }

    return (
        <Routes>
            {!erVelkommen && <Route path="*" element={<Navigate to={Path.VELKOMMEN} />} />}
            <Route
                path={Path.VELKOMMEN}
                element={
                    <Velkommen
                        startSøknad={setErVelkommen}
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
                        element={<OmBarnetSteg kjønn={personinfo.kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />}
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
                            <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                        }
                    />
                </>
            )}
        </Routes>
    );
};
