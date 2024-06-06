import { StethoscopeIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
}
const HvisMorBlirSyk: React.FunctionComponent<Props> = ({ arbeidssituasjon, barnet, hvemPlanlegger }) => {
    const intl = useIntl();

    const antallBarn = barnet.antallBarn;

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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk" />
                </Heading>
                <BodyLong>
                    {!kunEnPartSkalHa ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                            values={{ antallBarn, hvem: finnSøker2Tekst(intl, hvemPlanlegger) }}
                        />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstAlene"
                            values={{ antallBarn }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
export default HvisMorBlirSyk;
