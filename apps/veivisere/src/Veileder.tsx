import { FunctionComponent } from 'react';

import { LocaleAll } from '@navikt/fp-types';

import VeilederRouter from './VeilederRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Veileder: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return <VeilederRouter locale={locale} changeLocale={changeLocale} />;
};

export default Veileder;
