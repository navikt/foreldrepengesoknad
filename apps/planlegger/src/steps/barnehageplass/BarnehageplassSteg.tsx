import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FormattedMessage } from 'react-intl';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

import { Heading, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

dayjs.locale('nb');

export const BARNEHAGELOVEN_TEKST =
    'https://www.regjeringen.no/no/tema/familie-og-barn/barnehager/innsikt/Rett-til-barnehageplass/id2344761/';

export const barnehagestartDato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erIkkeFødt || erAdoptert) {
        const dato = erIkkeFødt || erFødt ? barnet.termindato : barnet.fødselsdato;

        if (dayjs(dato).month() < 8) return dayjs(dato).format('MMMM');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM');
    }
    return undefined;
};

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="barnehageplass.tittel" />
                </Heading>
                <VStack gap="10">
                    {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                    {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                </VStack>
                <VStack gap="20">
                    <HvorforSpørNAVOmDette text="TODO" />
                    <VStack>
                        <StepButtons
                            nextButtonOnClick={navigator.goToNextDefaultStep}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default BarnehageplassSteg;
