import { LocaleAll } from '@navikt/fp-types';
import { useRequest } from '@navikt/fp-api';
import { erMyndig } from '@navikt/fp-utils';
import { Umyndig } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { EsDataContext, EsDataMap } from 'appData/EsDataContext';
import Person from './types/Person';
import EngangsstønadRoutes, { ApiErrorHandler, Spinner, esApi } from 'EngangsstønadRoutes';

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
    } = useRequest<EsDataMap>(esApi, '/storage/engangstønad');

    if (errorHentPerson || errorMellomlagretData) {
        return <ApiErrorHandler error={notEmpty(errorHentPerson || errorMellomlagretData)} />;
    }

    if (!person || loadingMellomlagretData) {
        return <Spinner />;
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig appnavn="Engangsstønad" />;
    }

    return (
        <EsDataContext initialState={mellomlagretData}>
            <EngangsstønadRoutes
                locale={locale}
                onChangeLocale={onChangeLocale}
                person={person}
                mellomlagretData={mellomlagretData}
            />
        </EsDataContext>
    );
};

export default Engangsstønad;
