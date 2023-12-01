import { LocaleAll } from '@navikt/fp-types';
import { useRequest } from '@navikt/fp-api';
import { erMyndig } from '@navikt/fp-utils';
import { Umyndig } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { EsDataContext } from 'appData/EsDataContext';
import Person from './types/Person';
import EngangsstønadRoutes, { ApiErrorHandler, Spinner, esApi } from './EngangsstønadRoutes';
import { EsDataMapAndVersion, VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';

interface Props {
    locale: LocaleAll;
    onChangeLocale: (locale: LocaleAll) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data: person, error: errorHentPerson } = useRequest<Person>(esApi, '/personinfo');

    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<EsDataMapAndVersion>(esApi, '/storage/engangsstonad');

    if (errorHentPerson || errorMellomlagretData) {
        return <ApiErrorHandler error={notEmpty(errorHentPerson || errorMellomlagretData)} />;
    }

    if (!person || loadingMellomlagretData) {
        return <Spinner />;
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    const mellomlagretState = mellomlagretData?.version === VERSJON_MELLOMLAGRING ? mellomlagretData : undefined;

    return (
        <EsDataContext initialState={mellomlagretState}>
            <EngangsstønadRoutes
                locale={locale}
                onChangeLocale={onChangeLocale}
                person={person}
                mellomlagretData={mellomlagretState}
            />
        </EsDataContext>
    );
};

export default Engangsstønad;
