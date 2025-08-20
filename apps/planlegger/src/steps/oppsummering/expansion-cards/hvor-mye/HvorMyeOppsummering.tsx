import { SackKronerIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { loggExpansionCardOpen } from 'utils/amplitudeUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { HvorMyePanel } from './HvorMyePanel';

interface Props {
    satser: Satser;
}

export const HvorMyeOppsummering = ({ satser }: Props) => {
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const hvorMye = notEmpty(useContextGetData(ContextDataType.HVOR_MYE));

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    return (
        <VStack gap="space-40">
            {(hvorMye.lønnSøker1 !== undefined || hvorMye.lønnSøker2 !== undefined) && (
                <ExpansionCard
                    aria-label=""
                    onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')}
                    size="small"
                >
                    <ExpansionCard.Header>
                        <HStack gap="space-24" align="center" wrap={false}>
                            <IconCircleWrapper size="medium" color="lightBlue">
                                <SackKronerIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <ExpansionCard.Title size="small">
                                <FormattedMessage id="HvorMyeOppsummering.Tittel" />
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-8">
                            {hvorMye.lønnSøker1 !== undefined && fornavnSøker1 && (
                                <HvorMyePanel satser={satser} fornavn={fornavnSøker1} lønnSøker={hvorMye.lønnSøker1} />
                            )}
                            {hvorMye.lønnSøker2 !== undefined && fornavnSøker2 && (
                                <HvorMyePanel satser={satser} fornavn={fornavnSøker2} lønnSøker={hvorMye.lønnSøker2} />
                            )}
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            )}
        </VStack>
    );
};
