import { BabyWrappedIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}
const DeFørsteSeksUkene: React.FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();
    const erAlenemor = hvemPlanlegger.type === Situasjon.MOR;
    return (
        <>
            <HStack gap="5" wrap={false}>
                <div>
                    <IconCircleWrapper color="lightBlue" size="medium">
                        <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                    </IconCircleWrapper>
                </div>
                <div>
                    <Heading size="small">
                        <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene" />
                    </Heading>
                    <BodyLong>
                        {erAlenemor ? (
                            <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene.TekstAlenemor" />
                        ) : (
                            <FormattedMessage
                                id="OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst"
                                values={{
                                    hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                }}
                            />
                        )}
                    </BodyLong>
                </div>
            </HStack>
        </>
    );
};
export default DeFørsteSeksUkene;
