import { useIntl } from 'react-intl';

import { LocaleAll } from '@navikt/fp-types';
import { FrontPage } from '@navikt/fp-ui';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvaSkjerNårForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();

    return (
        <FrontPage
            changeLocale={changeLocale}
            locale={locale}
            titleLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Innhold' })}
            goToNextDefaultStep={() => undefined}
        />
    );
};

export default HvaSkjerNårForside;
