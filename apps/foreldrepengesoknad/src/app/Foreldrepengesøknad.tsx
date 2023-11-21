import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@navikt/ds-react';
import { LocaleNo } from '@navikt/fp-types';
import { redirect } from '@navikt/fp-utils';
import Api from './api/api';
import { sendErrorMessageToSentry } from './api/apiUtils';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengesøknadRoutes';
import SøknadRoutes from './routes/routes';
import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';
import { shouldApplyStorage } from './utils/mellomlagringUtils';
import { RequestStatus } from './types/RequestState';
import { FpDataContext } from './context/FpDataContext';
import { konverterMellomlagretDataTilAppData } from './context/data';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { Kvittering } from './types/Kvittering';
import Environment from './Environment';

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

    const initialState = useMemo(
        () =>
            storageData && shouldApplyStorage(storageData)
                ? konverterMellomlagretDataTilAppData(storageData)
                : undefined,
        [storageData],
    );

    const søkerInfo = useMemo(
        () => (søkerinfoData ? mapSøkerinfoDTOToSøkerinfo(søkerinfoData) : undefined),
        [søkerinfoData],
    );

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

    if (!sakerData || !søkerInfo || storageStatus === RequestStatus.IN_PROGRESS) {
        return <Spinner />;
    }

    return (
        <ErrorBoundary søkerInfo={søkerInfo}>
            <FpDataContext initialState={initialState}>
                <BrowserRouter>
                    <ForeldrepengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerInfo}
                        saker={sakerData.foreldrepenger}
                        lagretCurrentRoute={storageData ? storageData.currentRoute : SøknadRoutes.VELKOMMEN}
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
