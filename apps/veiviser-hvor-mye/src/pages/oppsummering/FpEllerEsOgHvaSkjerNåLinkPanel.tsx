import { BabyWrappedIcon, CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Box, Heading, LinkCard, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const FpEllerEsOgHvaSkjerNåLinkPanel = () => {
    return (
        <div className="bg-ax-neutral-200 p-4">
            <VStack gap="space-8" className="mx-auto max-w-[560px]">
                <Heading size="small" level="2">
                    <FormattedMessage id="FpEllerEsOgHvaSkjerNåLinkPanel.AndreVeivisere" />
                </Heading>
                <LinkCard>
                    <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                        <LinkCard.Icon>
                            <BabyWrappedIcon aria-hidden height={45} width={45} />
                        </LinkCard.Icon>
                    </Box>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={links.veiviser} target="_blank" rel="noreferrer">
                            <FormattedMessage id="ArbeidssituasjonSide.FpEllerEs" />
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
                            <FormattedMessage id="ArbeidssituasjonSide.PlanleggForeldrepenger" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
            </VStack>
        </div>
    );
};
