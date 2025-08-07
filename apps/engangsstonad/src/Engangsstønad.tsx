import { useQuery } from '@tanstack/react-query';
import { EsDataContext } from 'appData/EsDataContext';
import { EsDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useIntl } from 'react-intl';

import { PersonFrontend } from '@navikt/fp-types';
import { RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, EngangsstønadRoutes } from './EngangsstønadRoutes';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Engangsstønad = () => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'Søknad.Pagetitle' }));

    const personinfo = useQuery({
        queryKey: ['PERSONINFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/personinfo`).json<PersonFrontend>(),
        staleTime: Infinity,
    });

    const mellomlagretInfo = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`).json<EsDataMapAndMetaData>(),
        staleTime: Infinity,
    });

    if (personinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(personinfo.error ?? mellomlagretInfo.error)} />;
    }

    if (!personinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    if (!erMyndig(personinfo.data.fødselsdato)) {
        return <Umyndig appName="engangsstonad" />;
    }

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    if (mellomlagretState && !isEqual(mellomlagretState.personinfo, personinfo.data)) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="engangsstonad"
            />
        );
    }

    return (
        <EsDataContext initialState={mellomlagretState}>
            <EngangsstønadRoutes personinfo={personinfo.data} mellomlagretData={mellomlagretState} />
        </EsDataContext>
    );
};
