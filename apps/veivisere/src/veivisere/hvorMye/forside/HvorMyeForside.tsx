import { BabyWrappedIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';

import AndreVeivisereLinkPanel from '../../felles/andreVeivisere/AndreVeivisereLinkPanel';
import FrontPage from '../../felles/frontpage/FrontPage';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvorMyeForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'veivisere',
            team: 'foreldrepenger',
            pageKey: ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM,
        });
    }, []);

    return (
        <>
            <FrontPage
                changeLocale={changeLocale}
                locale={locale}
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
                                    <Heading level="3" size="small">
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

export default HvorMyeForside;
