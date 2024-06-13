import { FunctionComponent } from 'react';

import { LocaleAll } from '@navikt/fp-types';

import VeiviserRouter from './VeiviserRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Veiviser: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return <VeiviserRouter locale={locale} changeLocale={changeLocale} />;
};

export default Veiviser;
