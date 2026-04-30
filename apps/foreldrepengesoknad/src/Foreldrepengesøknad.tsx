import { useQuery } from '@tanstack/react-query';
import { API_URLS, mellomlagretInfoOptions, sakerOptions, useAnnenPartVedtakOptions, søkerinfoOptions } from 'api/queries';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { SøknadRoutes } from 'appData/routes';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { ReactNode, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { shouldApplyStorage } from 'utils/mellomlagringUtils';

import { ErrorBoundary, RegisterdataUtdatert, Spinner } from '@navikt/fp-ui';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
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

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}>
            <FpDataContext initialState={mellomlagretData}>
                <RegisterdataSjekk
                    mellomlagretData={mellomlagretData}
                    søkerInfo={søkerinfoQuery.data}
                    foreldrepengerSaker={sakerQuery.data.foreldrepenger}
                >
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
                </RegisterdataSjekk>
            </FpDataContext>
        </ErrorBoundary>
    );
};

// Sjekkar om registerdata (søkerInfo, saker, annenpartsvedtak) har endra seg
// sidan mellomlagring. Renderast inne i FpDataContext slik at
// useAnnenPartVedtakOptions kan lesa annenForelder/barn frå context og sjølv
// styra om kallet skal gjerast.
const RegisterdataSjekk = ({
    mellomlagretData,
    søkerInfo,
    foreldrepengerSaker,
    children,
}: {
    mellomlagretData: FpMellomlagretData | undefined;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    children: ReactNode;
}) => {
    const annenPartVedtakQuery = useQuery(useAnnenPartVedtakOptions());

    if (!mellomlagretData) {
        return <>{children}</>;
    }

    const harLagretAnnenPartVedtak = mellomlagretData.annenPartVedtak !== undefined;

    if (harLagretAnnenPartVedtak && annenPartVedtakQuery.isPending && annenPartVedtakQuery.fetchStatus !== 'idle') {
        return <Spinner />;
    }

    const annenPartVedtakErEndret =
        harLagretAnnenPartVedtak &&
        annenPartVedtakQuery.isSuccess &&
        !isEqual(annenPartVedtakQuery.data, mellomlagretData.annenPartVedtak);

    const registerdataErEndret =
        !isEqual(mellomlagretData.søkerInfo, søkerInfo) ||
        !isEqual(mellomlagretData.foreldrepengerSaker, foreldrepengerSaker) ||
        annenPartVedtakErEndret;

    if (registerdataErEndret) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="foreldrepengesoknad"
            />
        );
    }

    return <>{children}</>;
};
