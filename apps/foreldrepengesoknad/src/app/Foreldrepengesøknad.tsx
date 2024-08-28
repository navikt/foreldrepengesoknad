import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { LocaleNo } from '@navikt/fp-types';
import { ErrorBoundary } from '@navikt/fp-ui';
import { redirect, useDocumentTitle } from '@navikt/fp-utils';

import Environment from './Environment';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import Api from './api/api';
import { sendErrorMessageToSentry } from './api/apiUtils';
import { FpDataContext } from './appData/FpDataContext';
import { konverterMellomlagretDataTilAppData } from './appData/konverterMellomlagretDataTilAppData';
import SøknadRoutes from './appData/routes';
import { Kvittering } from './types/Kvittering';
import { RequestStatus } from './types/RequestState';
import { shouldApplyStorage } from './utils/mellomlagringUtils';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const retryCallback = async () => {
    try {
        await Api.deleteMellomlagretSøknad();
    } catch (error) {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

interface Props {
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
}

const Foreldrepengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { sakerData, sakerError } = Api.useGetSaker();
    const { storageData, storageStatus } = Api.useStoredAppState();

    const [kvittering, setKvittering] = useState<Kvittering>();

    useEffect(() => {
        if (søkerinfoError) {
            sendErrorMessageToSentry(søkerinfoError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (sakerError) {
            sendErrorMessageToSentry(sakerError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfoError, sakerError]);

    // TODO (TOR) Dropp mapping her og dytt mellomlagra data inn i context rått
    const initialState =
        storageData && shouldApplyStorage(storageData) ? konverterMellomlagretDataTilAppData(storageData) : undefined;

    const applyStorage = storageData !== undefined && shouldApplyStorage(storageData);

    useEffect(() => {
        if (storageData?.locale && storageData.locale !== locale) {
            onChangeLocale(storageData.locale);
        }
    }, [storageData]);

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

    if (!sakerData || !søkerinfoData || storageStatus === RequestStatus.IN_PROGRESS) {
        return <Spinner />;
    }

    return (
        <ErrorBoundary appName="Foreldrepenger" retryCallback={retryCallback}>
            <FpDataContext initialState={initialState}>
                <BrowserRouter>
                    <ForeldrepengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfoData}
                        saker={sakerData.foreldrepenger}
                        currentRoute={applyStorage ? storageData.currentRoute : SøknadRoutes.VELKOMMEN}
                        lagretErEndringssøknad={applyStorage ? storageData.søknad?.erEndringssøknad : false}
                        lagretHarGodkjentVilkår={applyStorage ? storageData.søknad?.harGodkjentVilkår : false}
                        lagretSøknadGjelderNyttBarn={applyStorage ? storageData.søknadGjelderEtNyttBarn : false}
                        setKvittering={setKvittering}
                    />
                </BrowserRouter>
            </FpDataContext>
        </ErrorBoundary>
    );
};

export default Foreldrepengesøknad;
