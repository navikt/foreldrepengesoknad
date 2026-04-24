import { useQuery } from '@tanstack/react-query';
import { API_URLS, mellomlagretInfoOptions, sakerOptions, søkerinfoOptions } from 'api/queries';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';

import { ErrorBoundary, RegisterdataUtdatert, Spinner } from '@navikt/fp-ui';
import { useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

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
    const mellomlagretInfoData = mellomlagretInfoQuery.data;

    useEffect(() => {
        if (søkerinfoQuery.error || sakerQuery.error) {
            const error = new Error(intl.formatMessage({ id: 'Foreldrepengesøknad.FeilVedHentingAvInformasjon' }));
            throw error;
        }
    }, [søkerinfoQuery.error, sakerQuery.error, intl]);

    if (!sakerQuery.data || !søkerinfoQuery.data || mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    const skalBrukeMellomlagretData = mellomlagretInfoData !== undefined && shouldApplyStorage(mellomlagretInfoData);
    const mellomlagretData = skalBrukeMellomlagretData ? mellomlagretInfoData : undefined;

    if (
        !!mellomlagretData &&
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
            <FpDataContext initialState={mellomlagretData}>
                <ForeldrepengesøknadRoutes
                    søkerInfo={søkerinfoQuery.data}
                    foreldrepengerSaker={sakerQuery.data.foreldrepenger}
                    currentRoute={
                        skalBrukeMellomlagretData
                            ? notEmpty(mellomlagretData?.[ContextDataType.APP_ROUTE])
                            : SøknadRoutes.VELKOMMEN
                    }
                    lagretErEndringssøknad={mellomlagretData?.erEndringssøknad ?? false}
                    lagretHarGodkjentVilkår={!!mellomlagretData?.[ContextDataType.APP_ROUTE]}
                    lagretSøknadGjelderNyttBarn={mellomlagretData?.søknadGjelderEtNyttBarn ?? false}
                />
            </FpDataContext>
        </ErrorBoundary>
    );
};
