import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FormattedMessage } from 'react-intl';
import { isAlene } from 'types/HvemPlanlegger';

import { Heading, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

dayjs.locale('nb');

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
