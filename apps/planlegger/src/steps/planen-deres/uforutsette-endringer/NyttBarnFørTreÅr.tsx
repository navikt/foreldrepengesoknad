import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker, getErFarEllerMedmor } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
}
export const NyttBarnFørTreÅr = ({ arbeidssituasjon, hvemPlanlegger }: Props) => {
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erFar = (() => {
        switch (hvemPlanlegger.type) {
            case HvemPlanleggerType.MOR:
            case HvemPlanleggerType.MOR_OG_MEDMOR:
                return false;
            default:
                return true;
        }
    })();
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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr" />
                </Heading>
                <BodyLong>
                    {!erAleneOmOmsorg && erFarEllerMedmor ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.TekstKunFarEllerMedmor"
                            values={{ erFar }}
                        />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.Tekst"
                            values={{ erAleneforsørger: kunEnPartSkalHa }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
