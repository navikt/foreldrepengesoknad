import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { EsMellomlagretData, useEsMellomlagring } from 'appData/useEsMellomlagring';
import { useEsSendSøknad } from 'appData/useEsSendSøknad';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

import { Alert, Button, VStack } from '@navikt/ds-react';

import { EsPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
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

// Definert utenfor komponenten slik at fokus bare settes når feilmeldingen vises, ikke ved hver rendring.
const fokuser = (element: HTMLDivElement | null) => element?.focus();

export const ApiErrorHandler = ({ error }: { error: Error }) => {
    return <ErrorPage appName="engangsstonad" errorMessage={error.message} retryCallback={() => location.reload()} />;
};

interface Props {
    personinfo: EsPersonopplysningerDto_fpoversikt;
    mellomlagretData?: EsMellomlagretData;
}

export const EngangsstønadRoutes = ({ personinfo, mellomlagretData }: Props) => {
    const navigate = useNavigate();

    const [erVelkommen, setErVelkommen] = useState(false);

    const { sendSøknad, errorSendSøknad } = useEsSendSøknad(personinfo);
    const { mellomlagreOgNaviger, lagringFeilet, nullstillLagringFeilet } = useEsMellomlagring(
        personinfo,
        setErVelkommen,
    );

    useEffect(() => {
        const currentPath = mellomlagretData?.[ContextDataType.CURRENT_PATH];
        if (!currentPath) {
            return;
        }

        // eslint-disable-next-line @eslint-react/set-state-in-effect -- OK, skjer kun ved ekstern endring
        setErVelkommen(true);
        void navigate(currentPath);
    }, [mellomlagretData]);

    if (errorSendSøknad) {
        return <ApiErrorHandler error={errorSendSøknad} />;
    }

    return (
        <VStack gap="space-16">
            {lagringFeilet && (
                <VStack align="center" paddingBlock="space-16" paddingInline="space-16">
                    <VStack maxWidth="600px" width="100%">
                        <Alert variant="error" ref={fokuser} tabIndex={-1}>
                            <VStack align="start" gap="space-8">
                                <FormattedMessage id="Mellomlagring.FeiletVedFortsettSenere" />
                                <Button type="button" variant="secondary" size="small" onClick={nullstillLagringFeilet}>
                                    <FormattedMessage id="Mellomlagring.FeiletVedFortsettSenere.Lukk" />
                                </Button>
                            </VStack>
                        </Alert>
                    </VStack>
                </VStack>
            )}
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
                            element={
                                <OmBarnetSteg kjønn={personinfo.kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                            }
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
        </VStack>
    );
};
