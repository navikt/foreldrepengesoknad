import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
}
export const NyttBarnFørTreÅr = ({ arbeidssituasjon, hvemPlanlegger }: Props) => {
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>

            <div>
                <Heading size="small" level="4">
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr"
                        values={{ erAleneforsørger: erAleneOmOmsorg }}
                    />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.Tekst"
                        values={{ erAleneforsørger: kunEnPartSkalHa }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
