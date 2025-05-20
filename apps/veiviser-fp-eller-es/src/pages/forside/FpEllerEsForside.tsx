import { InformationIcon, StrollerIcon } from '@navikt/aksel-icons';
import { FpEllerEsRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { FrontPage, Infobox } from '@navikt/fp-ui';

export const FpEllerEsForside = () => {
    const intl = useIntl();

    const { goToRoute } = useVeiviserNavigator();

    return (
        <FrontPage
            titleLabel={intl.formatMessage({ id: 'FpEllerEsForside.Title' })}
            minutesLabel={intl.formatMessage({ id: 'FpEllerEsForside.Minutes' })}
            innholdLabel={intl.formatMessage({ id: 'FpEllerEsForside.Innhold' })}
            goToNextDefaultStep={() => goToRoute(FpEllerEsRoutes.SITUASJON)}
            childrenBelowStartButton
            icon={<StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden />}
        >
            <Infobox
                header={<FormattedMessage id="FpEllerEsForside.Foreldrepenger" />}
                headingLevel="2"
                color="gray"
                icon={<InformationIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <BodyShort>
                    <FormattedMessage id="FpEllerEsForside.FpErstatte" />
                </BodyShort>
            </Infobox>
            <Infobox
                header={<FormattedMessage id="FpEllerEsForside.Engangsstønad" />}
                headingLevel="2"
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
