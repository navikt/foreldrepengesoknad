import useVeilederNavigator from 'appData/useVeilederNavigator';
import { useIntl } from 'react-intl';

import { LocaleAll } from '@navikt/fp-types';
import { FrontPage } from '@navikt/fp-ui';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvorMyeForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();
    const navigator = useVeilederNavigator();
    return (
        <FrontPage
            changeLocale={changeLocale}
            locale={locale}
            titleLabel={intl.formatMessage({ id: 'HvorMyeForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'HvorMyeForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'HvorMyeForside.Innhold' })}
            goToNextDefaultStep={navigator.goToNextDefaultStep}
        />
    );
};

export default HvorMyeForside;
