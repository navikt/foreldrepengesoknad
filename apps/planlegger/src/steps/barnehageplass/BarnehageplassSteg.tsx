import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FormattedMessage } from 'react-intl';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';

import { Heading, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import AleneforsørgerBarnehageplass from './situasjon/AleneforsørgerBarnehageplass';
import FlereForsørgereBarnehageplass from './situasjon/FlereForsørgereBarnehageplass';

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    useScrollBehaviour();

    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    //TODO Treng ein både AleneforsørgerBarnehageplass og FlereForsørgereBarnehageplass? Ser veldig like ut

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="BarnehageplassSteg.Tittel" />
                </Heading>
                <VStack gap="10">
                    {!erAlenesøker(hvemPlanlegger) && <FlereForsørgereBarnehageplass barnet={barnet} />}
                    {erAlenesøker(hvemPlanlegger) && <AleneforsørgerBarnehageplass barnet={barnet} />}
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
        </PlanleggerStepPage>
    );
};

export default BarnehageplassSteg;
