import { useQuery } from '@tanstack/react-query';
import { EsDataContext } from 'appData/EsDataContext';
import { API_URLS, mellomlagretInfoOptions, personOptions } from 'appData/queries';
import { VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useIntl } from 'react-intl';

import { RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, EngangsstønadRoutes } from './EngangsstønadRoutes';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(API_URLS.mellomlagring);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Engangsstønad = () => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'Søknad.Pagetitle' }));

    const personinfo = useQuery(personOptions());

    const mellomlagretInfo = useQuery(mellomlagretInfoOptions());

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
