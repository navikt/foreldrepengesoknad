import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FormattedMessage } from 'react-intl';
import { OmBarnet, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';
import { PeriodeEnum } from 'types/Periode';

import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Kalender from './kalender/Kalender';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

dayjs.locale('nb');

const barnehagestartDato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    if (erFødt || erIkkeFødt) {
        const dato = erIkkeFødt ? barnet.termindato : barnet.fødselsdato;

        if (dayjs(dato).month() < 8) return dayjs(dato).format('MMMM');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM');
    }
    return undefined;
};
const OversiktSteg = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                <VStack gap="2">
                    <HStack gap="32">
                        <Box background="surface-info-subtle" padding="2" borderRadius="xlarge">
                            <HStack gap="5" align="center">
                                <BlåSirkel />
                                <BodyShort>
                                    {valgtPeriode.periode === PeriodeEnum.HUNDRE && (
                                        <FormattedMessage id="ukerForeldrepenger.100" />
                                    )}
                                    {valgtPeriode.periode === PeriodeEnum.ÅTTI && (
                                        <FormattedMessage id="ukerForeldrepenger.80" />
                                    )}
                                </BodyShort>
                            </HStack>
                        </Box>
                        <Box background="surface-danger-subtle" padding="2" borderRadius="xlarge">
                            <HStack gap="5" align="center">
                                <Hjerte />
                                <BodyShort>
                                    <FormattedMessage id="termindatoIkontekst" />
                                </BodyShort>
                            </HStack>
                        </Box>
                    </HStack>

                    <HStack gap="4">
                        <Box background="surface-success-subtle" padding="2" borderRadius="xlarge">
                            <HStack gap="5" align="center">
                                <RosaSirkel />
                                <BodyShort>
                                    <FormattedMessage
                                        id="barnehagestartIkontekst"
                                        values={{ mnd: barnehagestartDato(barnet) }}
                                    />
                                </BodyShort>
                            </HStack>
                        </Box>
                    </HStack>
                </VStack>
                <VStack gap="10">
                    <VStack gap="2">
                        <Kalender />
                    </VStack>
                </VStack>

                <VStack gap="10">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default OversiktSteg;
