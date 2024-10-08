import * as Sentry from '@sentry/browser';
import { useQuery } from '@tanstack/react-query';
import { storageParser } from 'api/storageParser';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { SakerOppslag } from 'types/SakerOppslag';

import { Loader } from '@navikt/ds-react';

import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorBoundary } from '@navikt/fp-ui';
import { redirect, useDocumentTitle } from '@navikt/fp-utils';

import Environment from './Environment';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import { FpDataContext } from './app-data/FpDataContext';
import { konverterMellomlagretDataTilAppData } from './app-data/konverterMellomlagretDataTilAppData';
import SøknadRoutes from './app-data/routes';
import { Kvittering } from './types/Kvittering';
import { shouldApplyStorage } from './utils/mellomlagringUtils';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const retryCallback = async () => {
    try {
        await ky.delete(`${Environment.PUBLIC_PATH}/rest/storage/foreldrepenger`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const søkerinfo = useQuery({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(`${Environment.PUBLIC_PATH}/rest/sokerinfo`).json<Søkerinfo>(),
    });

    const saker = useQuery({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${Environment.PUBLIC_PATH}/rest/innsyn/v2/saker`).json<SakerOppslag>(),
    });

    const mellomlagretInfo = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: async () => await ky.get(`${Environment.PUBLIC_PATH}/rest/storage/foreldrepenger`).text(),
        select: (text: string) => {
            // TODO (TOR) Ta vekk parsing her etter at ny uttaksplan (og rydding av andre Date i context) er gjort
            return storageParser(text) as FpMellomlagretData;
        },
    });

    const [kvittering, setKvittering] = useState<Kvittering>();

    useEffect(() => {
        if (søkerinfo.error) {
            Sentry.captureMessage(søkerinfo.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (saker.error) {
            Sentry.captureMessage(saker.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfo.error, saker.error]);

    const applyStorage = mellomlagretInfo.data !== undefined && shouldApplyStorage(mellomlagretInfo.data);

    // TODO (TOR) Dropp mapping her og dytt mellomlagra data inn i context rått
    const initialState = applyStorage ? konverterMellomlagretDataTilAppData(mellomlagretInfo.data) : undefined;

    useEffect(() => {
        if (mellomlagretInfo.data?.locale && mellomlagretInfo.data.locale !== locale) {
            onChangeLocale(mellomlagretInfo.data.locale);
        }
    }, [mellomlagretInfo.data]);

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

    if (!saker.data || !søkerinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    return (
        <ErrorBoundary appName="Foreldrepenger" retryCallback={retryCallback}>
            <FpDataContext initialState={initialState}>
                <BrowserRouter basename={Environment.PUBLIC_PATH}>
                    <ForeldrepengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfo.data}
                        saker={saker.data.foreldrepenger}
                        currentRoute={applyStorage ? mellomlagretInfo.data.currentRoute : SøknadRoutes.VELKOMMEN}
                        lagretErEndringssøknad={applyStorage ? mellomlagretInfo.data.søknad?.erEndringssøknad : false}
                        lagretHarGodkjentVilkår={applyStorage ? mellomlagretInfo.data.søknad?.harGodkjentVilkår : false}
                        lagretSøknadGjelderNyttBarn={
                            applyStorage ? mellomlagretInfo.data.søknadGjelderEtNyttBarn : false
                        }
                        setKvittering={setKvittering}
                    />
                </BrowserRouter>
            </FpDataContext>
        </ErrorBoundary>
    );
};

export default Foreldrepengesøknad;
