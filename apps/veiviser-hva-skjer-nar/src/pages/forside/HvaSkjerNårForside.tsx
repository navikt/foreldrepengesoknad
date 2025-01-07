import { CalendarIcon } from '@navikt/aksel-icons';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { useIntl } from 'react-intl';

import { LocaleAll } from '@navikt/fp-types';
import { FrontPage } from '@navikt/fp-ui';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvaSkjerNårForside = ({ locale, changeLocale }: Props) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator();
    return (
        <FrontPage
            changeLocale={changeLocale}
            locale={locale}
            titleLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'HvaSkjerNårForside.Innhold' })}
            goToNextDefaultStep={() => goToRoute(HvaSkjerNårRoutes.SITUASJON)}
            icon={<CalendarIcon height={48} width={48} fontSize="1.5rem" aria-hidden />}
        />
    );
};
