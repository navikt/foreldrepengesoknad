import { ParasolBeachIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erFarDelAvSøknaden, finnAnnenPartTekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}
const LeggeTilFerie: React.FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();
    return (
        <>
            <HStack gap="5" align="start" wrap={false} justify="space-between">
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
                        {erFarDelAvSøknaden(hvemPlanlegger) ? (
                            <FormattedMessage
                                id="OmÅTilpassePlanen.LeggeTilFerie.TekstFar"
                                values={{ hvem: finnAnnenPartTekst(intl, hvemPlanlegger) }}
                            />
                        ) : (
                            <FormattedMessage
                                id="OmÅTilpassePlanen.LeggeTilFerie.Tekst"
                                values={{ hvem: finnAnnenPartTekst(intl, hvemPlanlegger) }}
                            />
                        )}
                    </BodyLong>
                </div>
            </HStack>
        </>
    );
};
export default LeggeTilFerie;
