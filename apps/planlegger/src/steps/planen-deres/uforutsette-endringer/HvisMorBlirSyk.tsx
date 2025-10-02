import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
}

export const HvisMorBlirSyk = ({ arbeidssituasjon, barnet, hvemPlanlegger }: Props) => {
    const intl = useIntl();

    const antallBarn = barnet.antallBarn;

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk" />
                </Heading>
                <BodyLong>
                    {kunEnPartSkalHa ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstAlene"
                            values={{ antallBarn }}
                        />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                            values={{ antallBarn, hvem: finnSøker2Tekst(intl, hvemPlanlegger) }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
