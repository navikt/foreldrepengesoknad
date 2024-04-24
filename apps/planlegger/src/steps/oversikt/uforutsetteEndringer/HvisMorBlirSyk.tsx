import { StethoscopeIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnAnnenPartTekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
}
const HvisMorBlirSyk: React.FunctionComponent<Props> = ({ barnet, hvemPlanlegger }) => {
    const antallBarn = barnet.antallBarn;
    const intl = useIntl();

    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk" />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                        values={{ antallBarn, hvem: finnAnnenPartTekst(intl, hvemPlanlegger) }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default HvisMorBlirSyk;
