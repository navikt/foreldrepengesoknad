import { BabyWrappedIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { LocaleAll } from '@navikt/fp-types';
import { FrontPage } from '@navikt/fp-ui';

import AndreVeivisereLinkPanel from '../felles/AndreVeivisereLinkPanel';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvorMyeForside: React.FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);
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
