import { FunctionComponent } from 'react';

import { createApi } from '@navikt/fp-api';
import { LocaleAll } from '@navikt/fp-types';

import VeilederRouter from './VeilederRouter';
import Environment from './appData/Environment';

export const planleggerApi = createApi(Environment.REST_API_URL);

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Veileder: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return <VeilederRouter locale={locale} changeLocale={changeLocale} />;
};

export default Veileder;
