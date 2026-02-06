import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
}

export const FødtFørUke33 = ({ arbeidssituasjon, hvemPlanlegger }: Props) => {
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <StethoscopeIcon
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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33" />
                </Heading>
                <BodyLong>
                    {morHarIkkeRett ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33.TekstMorIkkeRett"
                            values={{
                                erAleneforsørger: kunEnPartSkalHa,
                                erMedmor: hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR,
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33.Tekst"
                            values={{ erAleneforsørger: kunEnPartSkalHa }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
