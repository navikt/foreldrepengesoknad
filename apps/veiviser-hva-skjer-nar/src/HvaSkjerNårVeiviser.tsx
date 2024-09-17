import { FunctionComponent } from 'react';

import { LocaleAll } from '@navikt/fp-types';

import { HvaSkjerNårRouter } from './HvaSkjerNårRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvaSkjerNårVeiviser: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return <HvaSkjerNårRouter locale={locale} changeLocale={changeLocale} />;
};
