import { ParasolBeachIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}
const LeggeTilFerie: React.FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();
    const erAlenesøker = erAlene(hvemPlanlegger);
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
                        {!erAlenesøker ? (
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
