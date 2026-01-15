import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { EsDataMapAndMetaData, useEsMellomlagring } from 'appData/useEsMellomlagring';
import { useEsSendSøknad } from 'appData/useEsSendSøknad';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { PersonDto_fpoversikt } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';

import { KvitteringPage } from './kvittering/KvitteringPage';
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
    personinfo: PersonDto_fpoversikt;
    mellomlagretData?: EsDataMapAndMetaData;
}

export const EngangsstønadRoutes = ({ personinfo, mellomlagretData }: Props) => {
    const navigate = useNavigate();

    const [erVelkommen, setErVelkommen] = useState(false);

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(personinfo);
    const mellomlagreOgNaviger = useEsMellomlagring(personinfo, setErVelkommen);

    useEffect(() => {
        if (mellomlagretData?.[ContextDataType.CURRENT_PATH]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- OK, skjer kun ved ekstern endring
            setErVelkommen(true);
            void navigate(mellomlagretData[ContextDataType.CURRENT_PATH]);
        }
    }, [mellomlagretData]);

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
                    <Route path={Path.KVITTERING} element={<KvitteringPage />} />
                </>
            )}
        </Routes>
    );
};
