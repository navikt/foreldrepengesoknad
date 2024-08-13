import { InformationIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

import FrontPage from '../../felles/frontpage/FrontPage';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const FpEllerEsForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();

    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'veivisere',
            team: 'foreldrepenger',
            pageKey: ContextRoutes.FP_ELLER_ES + FpEllerEsRoutes.OM,
        });
    }, []);

    return (
        <FrontPage
            changeLocale={changeLocale}
            locale={locale}
            titleLabel={intl.formatMessage({ id: 'FpEllerEsForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'FpEllerEsForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'FpEllerEsForside.Innhold' })}
            goToNextDefaultStep={() => goToRoute(FpEllerEsRoutes.SITUASJON)}
            childrenBelowStartButton
        >
            <Infobox
                header={<FormattedMessage id="FpEllerEsForside.Foreldrepenger" />}
                color="gray"
                icon={<InformationIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <BodyShort>
                    <FormattedMessage id="FpEllerEsForside.FpErstatte" />
                </BodyShort>
            </Infobox>
            <Infobox
                header={<FormattedMessage id="FpEllerEsForside.Engangsstønad" />}
                color="gray"
                icon={<InformationIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <BodyShort>
                    <FormattedMessage id="FpEllerEsForside.EsEngangssum" />
                </BodyShort>
            </Infobox>
        </FrontPage>
    );
};

export default FpEllerEsForside;
