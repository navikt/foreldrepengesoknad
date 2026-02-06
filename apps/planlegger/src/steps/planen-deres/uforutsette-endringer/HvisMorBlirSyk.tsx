import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
}

export const HvisMorBlirSyk = ({ arbeidssituasjon, hvemPlanlegger }: Props) => {
    const intl = useIntl();

    const erMedmor = hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

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
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk"
                        values={{ erAlene: hvemHarRett === 'kunSøker1HarRett' }}
                    />
                </Heading>
                <BodyLong>
                    {arbeidssituasjon.status === Arbeidsstatus.INGEN ||
                    arbeidssituasjon.status === Arbeidsstatus.UFØR ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstKunFarEllerMedmor"
                            values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger), erMedmor }}
                        />
                    ) : kunEnPartSkalHa ? (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstAlene" />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                            values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger), erMedmor }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
