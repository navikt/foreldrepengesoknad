import { CalendarIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvaSkjerNårRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';

import FrontPage from '../../felles/frontpage/FrontPage';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvaSkjerNårForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVA_SKJER);
    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: VeiviserAmplitudeKey.HVA_SKJER_NÅR,
            team: 'foreldrepenger',
            pageKey: ContextRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM,
        });
    }, []);
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

export default HvaSkjerNårForside;
