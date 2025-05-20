import * as Sentry from '@sentry/browser';
import { useQuery } from '@tanstack/react-query';
import { storageParser } from 'api/storageParser';
import { FpDataContext } from 'appData/FpDataContext';
import { konverterMellomlagretDataTilAppData } from 'appData/konverterMellomlagretDataTilAppData';
import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Kvittering } from 'types/Kvittering';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';

import { Loader } from '@navikt/ds-react';

import { LocaleNo, Saker, Søkerinfo } from '@navikt/fp-types';
import { ErrorBoundary, RegisterdataUtdatert } from '@navikt/fp-ui';
import { redirect, useDocumentTitle } from '@navikt/fp-utils';

import Environment from './Environment';
import { ForeldrepengesøknadRoutes } from './ForeldrepengesøknadRoutes';

const Spinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`);
    } catch {
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
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, { timeout: 30000 }).json<Søkerinfo>(),
        staleTime: Infinity,
    });

    const sakerQuery = useQuery({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<Saker>(),
        staleTime: Infinity,
    });

    const mellomlagretInfoQuery = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`).text(),
        select: (text: string) => {
            // TODO (TOR) Ta vekk parsing her etter at ny uttaksplan (og rydding av andre Date i context) er gjort
            return storageParser(text) as FpMellomlagretData;
        },
        staleTime: Infinity,
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

    const skalBrukeMellomlagretData =
        mellomlagretInfoQuery.data !== undefined && shouldApplyStorage(mellomlagretInfoQuery.data);

    // TODO (TOR) Dropp mapping her og dytt mellomlagra data inn i context rått
    const initialState = skalBrukeMellomlagretData
        ? konverterMellomlagretDataTilAppData(mellomlagretInfoQuery.data)
        : undefined;

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

    if (
        skalBrukeMellomlagretData &&
        (!isEqual(mellomlagretInfoQuery.data.søkerInfo, søkerinfoQuery.data) ||
            !isEqual(mellomlagretInfoQuery.data.foreldrepengerSaker, sakerQuery.data.foreldrepenger))
    ) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="foreldrepengesoknad"
            />
        );
    }

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={slettMellomlagringOgLastSidePåNytt}>
            <FpDataContext initialState={initialState}>
                <ForeldrepengesøknadRoutes
                    locale={locale}
                    onChangeLocale={onChangeLocale}
                    søkerInfo={søkerinfoQuery.data}
                    foreldrepengerSaker={sakerQuery.data.foreldrepenger}
                    currentRoute={
                        skalBrukeMellomlagretData ? mellomlagretInfoQuery.data.currentRoute : SøknadRoutes.VELKOMMEN
                    }
                    lagretErEndringssøknad={
                        skalBrukeMellomlagretData ? mellomlagretInfoQuery.data.søknad?.erEndringssøknad : false
                    }
                    lagretHarGodkjentVilkår={
                        skalBrukeMellomlagretData ? mellomlagretInfoQuery.data.søknad?.harGodkjentVilkår : false
                    }
                    lagretSøknadGjelderNyttBarn={
                        skalBrukeMellomlagretData ? mellomlagretInfoQuery.data.søknadGjelderEtNyttBarn : false
                    }
                    setKvittering={setKvittering}
                />
            </FpDataContext>
        </ErrorBoundary>
    );
};
