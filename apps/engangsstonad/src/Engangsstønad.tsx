import { useQuery } from '@tanstack/react-query';
import { EsDataContext } from 'appData/EsDataContext';
import { EsDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import ky from 'ky';
import { useIntl } from 'react-intl';

import { LocaleAll, PersonFrontend } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, EngangsstønadRoutes, Spinner } from './EngangsstønadRoutes';

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
}

export const Engangsstønad = ({ locale, onChangeLocale }: Props) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'Søknad.Pagetitle' }));

    const personinfo = useQuery({
        queryKey: ['PERSONINFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/personinfo`).json<PersonFrontend>(),
    });

    const mellomlagretInfo = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`).json<EsDataMapAndMetaData>(),
    });

    if (personinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(personinfo.error || mellomlagretInfo.error)} />;
    }

    if (!personinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    if (!erMyndig(personinfo.data.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    return (
        <EsDataContext initialState={mellomlagretState}>
            <EngangsstønadRoutes
                locale={locale}
                onChangeLocale={onChangeLocale}
                søker={personinfo.data}
                mellomlagretData={mellomlagretState}
            />
        </EsDataContext>
    );
};
