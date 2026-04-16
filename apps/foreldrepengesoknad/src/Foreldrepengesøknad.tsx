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

import { captureMessage } from '@navikt/fp-observability';
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
            captureMessage(søkerinfoQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (sakerQuery.error) {
            captureMessage(sakerQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfoQuery.error, sakerQuery.error]);

    const mellomlagretData = mellomlagretInfoQuery.data;
    const skalBrukeMellomlagretData =
        mellomlagretData !== undefined && mellomlagretData !== null && shouldApplyStorage(mellomlagretData);

    // TODO (TOR) Dropp mapping her og dytt mellomlagra data inn i context rått
    const initialState = skalBrukeMellomlagretData ? konverterMellomlagretDataTilAppData(mellomlagretData) : undefined;

    if (!sakerQuery.data || !søkerinfoQuery.data || mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    if (
        skalBrukeMellomlagretData &&
        (!isEqual(mellomlagretData.søkerInfo, søkerinfoQuery.data) ||
            !isEqual(mellomlagretData.foreldrepengerSaker, sakerQuery.data.foreldrepenger))
    ) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="foreldrepengesoknad"
            />
        );
    }

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}>
            <FpDataContext initialState={initialState}>
                <ForeldrepengesøknadRoutes
                    søkerInfo={søkerinfoQuery.data}
                    foreldrepengerSaker={sakerQuery.data.foreldrepenger}
                    currentRoute={skalBrukeMellomlagretData ? mellomlagretData.currentRoute : SøknadRoutes.VELKOMMEN}
                    lagretErEndringssøknad={
                        skalBrukeMellomlagretData ? mellomlagretData.søknad?.erEndringssøknad : false
                    }
                    lagretHarGodkjentVilkår={
                        skalBrukeMellomlagretData ? mellomlagretData.søknad?.harGodkjentVilkår : false
                    }
                    lagretSøknadGjelderNyttBarn={
                        skalBrukeMellomlagretData ? mellomlagretData.søknadGjelderEtNyttBarn : false
                    }
                />
            </FpDataContext>
        </ErrorBoundary>
    );
};
