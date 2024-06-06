import { EsDataContext } from 'appData/EsDataContext';
import { EsDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import { useIntl } from 'react-intl';

import { useRequest } from '@navikt/fp-api';
import { LocaleAll, Søker } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import EngangsstønadRoutes, { ApiErrorHandler, Spinner, esApi } from './EngangsstønadRoutes';

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'Søknad.Pagetitle' }));

    const { data: søker, error: errorHentSøker } = useRequest<Søker>(esApi, '/rest/personinfo');

    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<EsDataMapAndMetaData>(esApi, '/rest/storage/engangsstonad');

    if (errorHentSøker || errorMellomlagretData) {
        return <ApiErrorHandler error={notEmpty(errorHentSøker || errorMellomlagretData)} />;
    }

    if (!søker || loadingMellomlagretData) {
        return <Spinner />;
    }

    if (!erMyndig(søker.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    const mellomlagretState = mellomlagretData?.version === VERSJON_MELLOMLAGRING ? mellomlagretData : undefined;

    return (
        <EsDataContext initialState={mellomlagretState}>
            <EngangsstønadRoutes
                locale={locale}
                onChangeLocale={onChangeLocale}
                søker={søker}
                mellomlagretData={mellomlagretState}
            />
        </EsDataContext>
    );
};

export default Engangsstønad;
