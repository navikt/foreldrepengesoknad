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

    // Sjekk om svaret er lagret i mellomlagret data
    useEffect(() => {
        const mellomlagretState =
            mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING
                ? (mellomlagretInfo.data as SvpDataMapAndMetaData)
                : undefined;

        if (mellomlagretState?.erGravidBekreftet !== undefined) {
            setErGravidBekreftet(mellomlagretState.erGravidBekreftet);
        }
    }, [mellomlagretInfo.data]);

    // Lagre gravidbekreftelse til mellomlagring
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
                    erGravidBekreftet: erGravid, // Sett etter spread for å sikre at det ikke overskrives
                };

                await ky.post(API_URLS.mellomlagring, { json: data });

                // Invalider og hent mellomlagret data på nytt for å oppdatere cache
                await queryClient.invalidateQueries({ queryKey: ['MELLOMLAGRET_INFO'] });
            } catch (error) {
                // Logg feil men blokker ikke brukerflyten
                // Svaret er fortsatt lagret i lokal state
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

    // Vis gravidbekreftelsesspørsmål hvis ikke enda besvart
    if (erGravidBekreftet === undefined) {
        return (
            <ErDuGravidSteg
                onBekreft={async (erGravid) => {
                    setErGravidBekreftet(erGravid);
                    // Lagre til mellomlagring slik at det persisterer på tvers av sesjoner
                    await lagreGravidBekreftelse(erGravid);
                }}
            />
        );
    }

    // Vis "ikke kvalifisert"-melding hvis de svarte nei
    if (erGravidBekreftet === false) {
        return <IkkeGravid />;
    }

    // Fortsett med normal flyt hvis de svarte ja
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
