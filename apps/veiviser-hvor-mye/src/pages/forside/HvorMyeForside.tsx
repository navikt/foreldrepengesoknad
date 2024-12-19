import { BabyWrappedIcon, WalletIcon } from '@navikt/aksel-icons';
import { HvorMyeRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { veiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { AndreVeivisereLinkPanel, FrontPage } from '@navikt/fp-ui';

export const HvorMyeForside = () => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator();

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: veiviserAmplitudeKey,
            team: 'foreldrepenger',
            pageKey: HvorMyeRoutes.OM,
        });
    }, []);

    return (
        <>
            <FrontPage
                titleLabel={intl.formatMessage({ id: 'HvorMyeForside.Title' })}
                minutesLabel={intl.formatMessage({ id: 'HvorMyeForside.Minutes' })}
                innholdLabel={intl.formatMessage({ id: 'HvorMyeForside.Innhold' })}
                goToNextDefaultStep={() => goToRoute(HvorMyeRoutes.ARBEIDSSITUASJON)}
                icon={<WalletIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
            />
            <AndreVeivisereLinkPanel
                links={[
                    {
                        url: links.veiviser,
                        content: (
                            <HStack gap="5" align="center" wrap={false}>
                                <BabyWrappedIcon aria-hidden height={45} width={45} />
                                <VStack gap="4">
                                    <Heading level="2" size="small">
                                        <FormattedMessage id="HvorMyeForside.UsikkerFp" />
                                    </Heading>
                                    <BodyShort>
                                        <FormattedMessage id="HvorMyeForside.PrøvVeiviser" />
                                    </BodyShort>
                                </VStack>
                            </HStack>
                        ),
                    },
                ]}
            />
        </>
    );
};
