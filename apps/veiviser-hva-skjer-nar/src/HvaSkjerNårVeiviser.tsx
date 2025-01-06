import { LocaleAll } from '@navikt/fp-types';

import { HvaSkjerNårRouter } from './HvaSkjerNårRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvaSkjerNårVeiviser = ({ locale, changeLocale }: Props) => {
    return <HvaSkjerNårRouter locale={locale} changeLocale={changeLocale} />;
};
