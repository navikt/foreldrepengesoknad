import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
}
const FørTermin: React.FunctionComponent<Props> = ({ barnet, hvemPlanlegger }) => {
    const antallBarn = barnet.antallBarn;
    const erAlenesøker = erAlene(hvemPlanlegger);

    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="OmÅTilpassePlanen.FørTermin" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.FørTermin.Tekst" values={{ antallBarn, erAlenesøker }} />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default FørTermin;
