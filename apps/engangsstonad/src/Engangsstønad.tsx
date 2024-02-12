import { LocaleAll, Søker } from '@navikt/fp-types';
import { useRequest } from '@navikt/fp-api';
import { erMyndig } from '@navikt/fp-utils';
import { Umyndig, useCustomIntl } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { EsDataContext } from 'appData/EsDataContext';
import EngangsstønadRoutes, { ApiErrorHandler, Spinner, esApi } from './EngangsstønadRoutes';
import { EsDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import { useDocumentTitle } from '@navikt/fp-common';

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { i18n } = useCustomIntl();
    useDocumentTitle(i18n('Søknad.Pagetitle'));

    const { data: søker, error: errorHentSøker } = useRequest<Søker>(esApi, '/personinfo');

    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<EsDataMapAndMetaData>(esApi, '/storage/engangsstonad');

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
