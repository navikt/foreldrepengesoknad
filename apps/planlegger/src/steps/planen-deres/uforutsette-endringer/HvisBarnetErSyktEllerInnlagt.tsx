import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
}

export const HvisBarnetErSyktEllerInnlagt = ({ arbeidssituasjon }: Props) => {
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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisBarnetErSyktEllerInnlagt" />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisBarnetErSyktEllerInnlagt.Tekst"
                        values={{ erAleneforsørger: kunEnPartSkalHa }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
