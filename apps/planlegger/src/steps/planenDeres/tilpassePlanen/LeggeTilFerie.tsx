import { ParasolBeachIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}
const LeggeTilFerie: React.FunctionComponent<Props> = ({ hvemPlanlegger, arbeidssituasjon }) => {
    const intl = useIntl();
    const erAlenesøker = erAlene(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunFarSøker2EllerMedmorHarRett = hvemHarRett === 'kunSøker2HarRett';
    return (
        <>
            <HStack gap="5" wrap={false}>
                <div>
                    <IconCircleWrapper color="lightBlue" size="medium">
                        <ParasolBeachIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                    </IconCircleWrapper>
                </div>
                <div>
                    <Heading size="small">
                        <FormattedMessage id="OmÅTilpassePlanen.LeggeTilFerie" />
                    </Heading>
                    <BodyLong>
                        {kunFarSøker2EllerMedmorHarRett ? (
                            <FormattedMessage
                                id="OmÅTilpassePlanen.LeggeTilFerie.TekstFar"
                                values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger) }}
                            />
                        ) : (
                            <FormattedMessage
                                id="OmÅTilpassePlanen.LeggeTilFerie.Tekst"
                                values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger), erAlenesøker }}
                            />
                        )}
                    </BodyLong>
                </div>
            </HStack>
        </>
    );
};
export default LeggeTilFerie;
