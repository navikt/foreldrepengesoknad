import { BabyWrappedIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnAnnenPartTekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}
const ToUkerRundtFødsel: React.FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();
    return (
        <HStack gap="5" align="start" wrap={false} justify="space-between">
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="OmÅTilpassePlanen.ToUkerRundtFødsel" />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="OmÅTilpassePlanen.ToUkerRundtFødsel.Tekst"
                        values={{
                            hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                        }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default ToUkerRundtFødsel;
