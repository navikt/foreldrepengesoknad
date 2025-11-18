import * as Sentry from '@sentry/browser';
import { useQuery } from '@tanstack/react-query';
import { API_URLS, mellomlagretInfoOptions, sakerOptions, søkerinfoOptions } from 'api/queries';
import { FpDataContext } from 'appData/FpDataContext';
import { konverterMellomlagretDataTilAppData } from 'appData/konverterMellomlagretDataTilAppData';
import { SøknadRoutes } from 'appData/routes';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';

import { ErrorBoundary, RegisterdataUtdatert, Spinner } from '@navikt/fp-ui';
import { useDocumentTitle } from '@navikt/fp-utils';

import { ForeldrepengesøknadRoutes } from './ForeldrepengesøknadRoutes';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(API_URLS.mellomlagring);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Foreldrepengesøknad = () => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfoQuery = useQuery(søkerinfoOptions());

    const sakerQuery = useQuery(sakerOptions());

    const mellomlagretInfoQuery = useQuery(mellomlagretInfoOptions());

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
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={void slettMellomlagringOgLastSidePåNytt}>
            <FpDataContext initialState={initialState}>
                <ForeldrepengesøknadRoutes
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
                />
            </FpDataContext>
        </ErrorBoundary>
    );
};
