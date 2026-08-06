import { CalendarIcon, WalletIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Box, Heading, LinkCard, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const HvorMyeOgHvaSkjerNåLinkPanel = () => {
    return (
        // Eigen landemerke-region for «andre veivisere»-lenkjer, sidan innhaldet ligg
        // utanfor sida sitt <main> (VeiviserPage).
        <Box as="section" aria-labelledby="hvorMyeOgHvaSkjerNåLinkPanelTittel" className="bg-ax-neutral-200 p-4">
            <VStack gap="space-8" className="mx-auto max-w-[560px]">
                <Heading id="hvorMyeOgHvaSkjerNåLinkPanelTittel" size="small" level="2">
                    <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.AndreVeivisere" />
                </Heading>
                <LinkCard>
                    <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                        <LinkCard.Icon>
                            <WalletIcon aria-hidden height={45} width={45} />
                        </LinkCard.Icon>
                    </Box>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={links.hvorMye} target="_blank" rel="noreferrer">
                            <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.HvorMye" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
                <LinkCard>
                    <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                        <LinkCard.Icon>
                            <CalendarIcon aria-hidden height={45} width={45} />
                        </LinkCard.Icon>
                    </Box>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={links.foreldrepengerPlanlegger} target="_blank" rel="noreferrer">
                            <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.PlanleggForeldrepenger" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
            </VStack>
        </Box>
    );
};
