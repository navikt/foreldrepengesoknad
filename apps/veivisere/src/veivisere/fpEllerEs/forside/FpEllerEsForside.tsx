import { useIntl } from 'react-intl';

import { LocaleAll } from '@navikt/fp-types';
import { FrontPage } from '@navikt/fp-ui';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const FpEllerEsForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();

    return (
        <FrontPage
            changeLocale={changeLocale}
            locale={locale}
            titleLabel={intl.formatMessage({ id: 'FpEllerEsForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'FpEllerEsForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'FpEllerEsForside.Innhold' })}
            goToNextDefaultStep={() => undefined}
        />
    );
};

export default FpEllerEsForside;
