import { ParasolBeachIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}

export const LeggeTilFerie = ({ hvemPlanlegger, arbeidssituasjon }: Props) => {
    const intl = useIntl();
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const erAlenesøker = erAlene(hvemPlanlegger);
    const kunSøker2HarRett = hvemHarRett === 'kunSøker2HarRett';

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <ParasolBeachIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.LeggeTilFerie" />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="HvaErMulig.LeggeTilFerie.Tekst"
                        values={{
                            hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                            erAlenesøker,
                            kunSøker2HarRett,
                            erMedmor: hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR,
                        }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
