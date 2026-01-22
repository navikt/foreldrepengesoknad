import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS, mellomlagretInfoOptions, søkerinfoOptions } from 'appData/queries';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { ErDuGravidSteg } from './pages/er-du-gravid/ErDuGravidSteg';
import { IkkeGravid } from './pages/ikke-gravid/IkkeGravid';
import './styles/app.css';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(API_URLS.mellomlagring);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Svangerskapspengesøknad = () => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfo = useQuery(søkerinfoOptions());

    const mellomlagretInfo = useQuery(mellomlagretInfoOptions());
    const queryClient = useQueryClient();

    const [erGravidBekreftet, setErGravidBekreftet] = useState<boolean | undefined>(undefined);

    // Check if answer is stored in mellomlagret data
    useEffect(() => {
        const mellomlagretState =
            mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING
                ? (mellomlagretInfo.data as SvpDataMapAndMetaData)
                : undefined;

        if (mellomlagretState?.erGravidBekreftet !== undefined) {
            setErGravidBekreftet(mellomlagretState.erGravidBekreftet);
        }
    }, [mellomlagretInfo.data]);

    // Save pregnancy confirmation to mellomlagring
    const lagreGravidBekreftelse = useCallback(
        async (erGravid: boolean) => {
            try {
                const eksisterendeData = mellomlagretInfo.data;
                const data: SvpDataMapAndMetaData = {
                    version: VERSJON_MELLOMLAGRING,
                    søkerInfo: søkerinfo.data!,
                    ...(eksisterendeData && eksisterendeData.version === VERSJON_MELLOMLAGRING
                        ? eksisterendeData
                        : {}),
                    erGravidBekreftet: erGravid, // Set after spread to ensure it's not overwritten
                };

                await ky.post(API_URLS.mellomlagring, { json: data });

                // Invalidate and refetch mellomlagret data to update the cache
                await queryClient.invalidateQueries({ queryKey: ['MELLOMLAGRET_INFO'] });
            } catch (error) {
                // Log error but don't block the user flow
                // The answer is still stored in local state
                console.error('Kunne ikke lagre gravidbekreftelse:', error);
            }
        },
        [mellomlagretInfo.data, søkerinfo.data, queryClient],
    );

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error ?? mellomlagretInfo.error)} />;
    }

    if (!søkerinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    // Show pregnancy confirmation question if not yet answered
    if (erGravidBekreftet === undefined) {
        return (
            <ErDuGravidSteg
                onBekreft={async (erGravid) => {
                    setErGravidBekreftet(erGravid);
                    // Save to mellomlagring so it persists across sessions
                    await lagreGravidBekreftelse(erGravid);
                }}
            />
        );
    }

    // Show "not eligible" message if they answered no
    if (erGravidBekreftet === false) {
        return <IkkeGravid />;
    }

    // Continue with normal flow if they answered yes
    const erPersonMyndig = erMyndig(søkerinfo.data.person.fødselsdato);

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    if (mellomlagretState && !isEqual(mellomlagretState.søkerInfo, søkerinfo.data)) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="svangerskapspengesoknad"
            />
        );
    }

    return (
        <div>
            {erPersonMyndig ? (
                <SvpDataContext initialState={mellomlagretState}>
                    <SvangerskapspengesøknadRoutes søkerInfo={søkerinfo.data} mellomlagretData={mellomlagretState} />
                </SvpDataContext>
            ) : (
                <Umyndig appName="svangerskapspengesoknad" />
            )}
        </div>
    );
};
