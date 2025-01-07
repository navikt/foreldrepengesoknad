import * as Sentry from '@sentry/browser';
import { useQuery } from '@tanstack/react-query';
import { storageParser } from 'api/storageParser';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SakerOppslag } from 'types/SakerOppslag';

import { Loader } from '@navikt/ds-react';

import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorBoundary } from '@navikt/fp-ui';
import { redirect, useDocumentTitle } from '@navikt/fp-utils';

import Environment from './Environment';
import { ForeldrepengesøknadRoutes } from './ForeldrepengesøknadRoutes';
import { FpDataContext } from './app-data/FpDataContext';
import { konverterMellomlagretDataTilAppData } from './app-data/konverterMellomlagretDataTilAppData';
import { SøknadRoutes } from './app-data/routes';
import { Kvittering } from './types/Kvittering';
import { shouldApplyStorage } from './utils/mellomlagringUtils';

const Spinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const retryCallback = async () => {
    try {
        await ky.delete(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`);
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

export const Foreldrepengesøknad = ({ locale, onChangeLocale }: Props) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfoQuery = useQuery({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`).json<Søkerinfo>(),
    });

    const sakerQuery = useQuery({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<SakerOppslag>(),
    });

    const mellomlagretInfoQuery = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`).text(),
        select: (text: string) => {
            // TODO (TOR) Ta vekk parsing her etter at ny uttaksplan (og rydding av andre Date i context) er gjort
            return storageParser(text) as FpMellomlagretData;
        },
    });

    const [kvittering, setKvittering] = useState<Kvittering>();

    useEffect(() => {
        if (søkerinfoQuery.error) {
            Sentry.captureMessage(søkerinfoQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (sakerQuery.error) {
            Sentry.captureMessage(sakerQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfoQuery.error, sakerQuery.error]);

    const applyStorage = mellomlagretInfoQuery.data !== undefined && shouldApplyStorage(mellomlagretInfoQuery.data);

    // TODO (TOR) Dropp mapping her og dytt mellomlagra data inn i context rått
    const initialState = applyStorage ? konverterMellomlagretDataTilAppData(mellomlagretInfoQuery.data) : undefined;

    useEffect(() => {
        if (mellomlagretInfoQuery.data?.locale && mellomlagretInfoQuery.data.locale !== locale) {
            onChangeLocale(mellomlagretInfoQuery.data.locale);
        }
    }, [mellomlagretInfoQuery.data]);

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

    if (!sakerQuery.data || !søkerinfoQuery.data || mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={retryCallback}>
            <FpDataContext initialState={initialState}>
                <ForeldrepengesøknadRoutes
                    locale={locale}
                    onChangeLocale={onChangeLocale}
                    søkerInfo={søkerinfoQuery.data}
                    saker={sakerQuery.data.foreldrepenger}
                    currentRoute={applyStorage ? mellomlagretInfoQuery.data.currentRoute : SøknadRoutes.VELKOMMEN}
                    lagretErEndringssøknad={applyStorage ? mellomlagretInfoQuery.data.søknad?.erEndringssøknad : false}
                    lagretHarGodkjentVilkår={
                        applyStorage ? mellomlagretInfoQuery.data.søknad?.harGodkjentVilkår : false
                    }
                    lagretSøknadGjelderNyttBarn={
                        applyStorage ? mellomlagretInfoQuery.data.søknadGjelderEtNyttBarn : false
                    }
                    setKvittering={setKvittering}
                />
            </FpDataContext>
        </ErrorBoundary>
    );
};
