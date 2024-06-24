import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
}
const HvisManBlirSyk: React.FunctionComponent<Props> = ({ arbeidssituasjon }) => {
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';
    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    {kunEnPartSkalHa ? (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Alene" />
                    ) : (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk" />
                    )}
                </Heading>

                <BodyLong>
                    {kunEnPartSkalHa ? (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.TekstAlene" />
                    ) : (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Tekst" />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
export default HvisManBlirSyk;
