import { CalendarIcon, WalletIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { AndreVeivisereLinkPanel } from '@navikt/fp-ui';

export const HvorMyeOgHvaSkjerNåLinkPanel = () => {
    return (
        <AndreVeivisereLinkPanel
            links={[
                {
                    url: links.hvorMye,
                    content: (
                        <HStack gap="5" align="center" wrap={false}>
                            <WalletIcon aria-hidden height={45} width={45} />
                            <Heading level="3" size="small">
                                <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.HvorMye" />
                            </Heading>
                        </HStack>
                    ),
                },
                {
                    url: links.foreldrepengerPlanlegger,
                    content: (
                        <HStack gap="5" align="center" wrap={false}>
                            <CalendarIcon aria-hidden height={45} width={45} />
                            <Heading level="3" size="small">
                                <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.PlanleggForeldrepenger" />
                            </Heading>
                        </HStack>
                    ),
                },
            ]}
        />
    );
};
