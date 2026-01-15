import { BabyWrappedIcon, WalletIcon } from '@navikt/aksel-icons';
import { HvorMyeRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, LinkCard } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { FrontPage } from '@navikt/fp-ui';

export const HvorMyeForside = () => {
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
            />
            <div className="bg-ax-neutral-200 pb-5">
                <LinkCard className="mx-auto max-w-[560px]">
                    <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                        <LinkCard.Icon>
                            <BabyWrappedIcon aria-hidden height={45} width={45} />
                        </LinkCard.Icon>
                    </Box>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={links.veiviser} target="_blank" rel="noreferrer">
                            <FormattedMessage id="HvorMyeForside.UsikkerFp" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                    <LinkCard.Description>
                        <FormattedMessage id="HvorMyeForside.PrøvVeiviser" />
                    </LinkCard.Description>
                </LinkCard>
            </div>
        </>
    );
};
