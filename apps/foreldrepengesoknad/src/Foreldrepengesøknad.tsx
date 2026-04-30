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

import { captureMessage } from '@navikt/fp-observability';
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

    if (!sakerQuery.data || !søkerinfoQuery.data || mellomlagretInfoQuery.isPending) {
        return <Spinner />;
    }

    const skalBrukeMellomlagretData = mellomlagretInfoData !== undefined && shouldApplyStorage(mellomlagretInfoData);
    const mellomlagretData = skalBrukeMellomlagretData ? mellomlagretInfoData : undefined;

    const registerdataErEndret =
        !!mellomlagretData &&
        (!isEqual(mellomlagretData.søkerInfo, søkerinfoQuery.data) ||
            !isEqual(mellomlagretData.foreldrepengerSaker, sakerQuery.data.foreldrepenger));

    return (
        <ErrorBoundary appName="foreldrepengesoknad" retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}>
            <FpDataContext initialState={mellomlagretData}>
                <AnnenPartVedtakRegisterdataSjekk mellomlagretData={mellomlagretData}>
                    {registerdataErEndret ? (
                        <RegisterdataUtdatert
                            slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                            appName="foreldrepengesoknad"
                        />
                    ) : (
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
                    )}
                </AnnenPartVedtakRegisterdataSjekk>
            </FpDataContext>
        </ErrorBoundary>
    );
};

// Sjekkar om annenpartsvedtak har endra seg sidan mellomlagring. Renderast inne
// i FpDataContext slik at useAnnenPartVedtakOptions kan lesa annenForelder/barn
// frå context og sjølv styra `enabled` (kallet skjer berre når relevante data finst).
const AnnenPartVedtakRegisterdataSjekk = ({
    mellomlagretData,
    children,
}: {
    mellomlagretData: FpMellomlagretData | undefined;
    children: ReactNode;
}) => {
    const annenPartVedtakQuery = useQuery(useAnnenPartVedtakOptions());

    const harLagretAnnenPartVedtak = mellomlagretData?.annenPartVedtak !== undefined;

    if (harLagretAnnenPartVedtak && annenPartVedtakQuery.isPending && annenPartVedtakQuery.fetchStatus !== 'idle') {
        return <Spinner />;
    }

    const annenPartVedtakErEndret =
        harLagretAnnenPartVedtak &&
        annenPartVedtakQuery.isSuccess &&
        !isEqual(annenPartVedtakQuery.data, mellomlagretData.annenPartVedtak);

    if (annenPartVedtakErEndret) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="foreldrepengesoknad"
            />
        );
    }

    return <>{children}</>;
};
