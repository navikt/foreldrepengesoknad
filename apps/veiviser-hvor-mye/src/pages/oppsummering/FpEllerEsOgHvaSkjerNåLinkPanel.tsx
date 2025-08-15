import { BabyWrappedIcon, CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { AndreVeivisereLinkPanel } from '@navikt/fp-ui';

export const FpEllerEsOgHvaSkjerNåLinkPanel = () => {
    return (
        <AndreVeivisereLinkPanel
            links={[
                {
                    url: links.veiviser,
                    content: (
                        <HStack gap="5" align="center" wrap={false}>
                            <BabyWrappedIcon aria-hidden height={45} width={45} />
                            <Heading level="3" size="small">
                                <FormattedMessage id="ArbeidssituasjonSide.FpEllerEs" />
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
                                <FormattedMessage id="ArbeidssituasjonSide.PlanleggForeldrepenger" />
                            </Heading>
                        </HStack>
                    ),
                },
            ]}
        />
    );
};
