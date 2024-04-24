import { StethoscopeIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
}
const HvisManBlirSyk: React.FunctionComponent<Props> = ({ arbeidssituasjon }) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    {morHarIkkeRett ? (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Far" />
                    ) : (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk" />
                    )}
                </Heading>

                <BodyLong>
                    {morHarIkkeRett ? (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.TekstFar" />
                    ) : (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Tekst" />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
export default HvisManBlirSyk;
