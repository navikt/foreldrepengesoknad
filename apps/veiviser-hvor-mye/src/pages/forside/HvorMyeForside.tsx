import { BabyWrappedIcon, WalletIcon } from '@navikt/aksel-icons';
import { HvorMyeRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { LocaleAll } from '@navikt/fp-types';
import { AndreVeivisereLinkPanel, FrontPage } from '@navikt/fp-ui';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvorMyeForside = ({ locale, changeLocale }: Props) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator();

    return (
        <>
            <FrontPage
                titleLabel={intl.formatMessage({ id: 'HvorMyeForside.Title' })}
                minutesLabel={intl.formatMessage({ id: 'HvorMyeForside.Minutes' })}
                innholdLabel={intl.formatMessage({ id: 'HvorMyeForside.Innhold' })}
                goToNextDefaultStep={() => goToRoute(HvorMyeRoutes.ARBEIDSSITUASJON)}
                icon={<WalletIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
                locale={locale}
                changeLocale={changeLocale}
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
