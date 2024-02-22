import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import { redirect } from '@navikt/fp-utils';

import Environment from './Environment';
import Api from './api/api';
import { sendErrorMessageToSentry } from './api/apiUtils';
import { FpDataContext } from './context/FpDataContext';
import { konverterMellomlagretDataTilAppData } from './context/konverterMellomlagretDataTilAppData';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengesøknadRoutes';
import SøknadRoutes from './routes/routes';
import { Kvittering } from './types/Kvittering';
import { RequestStatus } from './types/RequestState';
import { shouldApplyStorage } from './utils/mellomlagringUtils';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

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
    const initialState = useMemo(
        () =>
            storageData && shouldApplyStorage(storageData)
                ? konverterMellomlagretDataTilAppData(storageData)
                : undefined,
        [storageData],
    );

    useEffect(() => {
        if (storageData?.søknad?.søker?.språkkode && storageData.søknad.søker.språkkode !== locale) {
            onChangeLocale(storageData.søknad?.søker?.språkkode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ErrorBoundary søker={søkerinfoData.søker}>
            <FpDataContext initialState={initialState}>
                <BrowserRouter>
                    <ForeldrepengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfoData}
                        saker={sakerData.foreldrepenger}
                        currentRoute={storageData ? storageData.currentRoute : SøknadRoutes.VELKOMMEN}
                        lagretErEndringssøknad={storageData?.søknad?.erEndringssøknad}
                        lagretHarGodkjentVilkår={storageData?.søknad?.harGodkjentVilkår}
                        lagretSøknadGjelderNyttBarn={storageData?.søknadGjelderEtNyttBarn}
                        setKvittering={setKvittering}
                    />
                </BrowserRouter>
            </FpDataContext>
        </ErrorBoundary>
    );
};

export default Foreldrepengesøknad;
