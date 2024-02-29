import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/GreenPanel';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isSameOrAfterToday } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import Adopsjon from './Adopsjon';
import Fødsel from './Fødsel';

export const isLessThanThreeMonthsLeft = (termindato?: string) => {
    const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');
    if (termindato === undefined) {
        return false;
    }
    return isSameOrAfterToday(termindato) && dayjs(termindato).isBefore(DATO_3_MND_FRAM);
};

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();

    const erFødsel = formMethods.watch('erFødsel');

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const lagreOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const lagre = (formValues: OmBarnet) => {
        lagreOmBarnet(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="6">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="barnet.tittel" />
                    </Heading>
                    <VStack gap="10">
                        <VStack gap="1">
                            <GreenPanel>
                                <RadioGroup
                                    name="erFødsel"
                                    label={
                                        isAlene(hvemPlanlegger) ? (
                                            <FormattedMessage id="barnet.hvaGjelderDeg" />
                                        ) : (
                                            <FormattedMessage id="barnet.hvaGjelder" />
                                        )
                                    }
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.fødselPanel.fødselEllerAdopsjon.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                >
                                    <Radio value={true}>
                                        <FormattedMessage id="barnet.fødsel" />
                                    </Radio>
                                    <Radio value={false}>
                                        <FormattedMessage id="barnet.adopsjon" />
                                    </Radio>
                                </RadioGroup>
                            </GreenPanel>
                        </VStack>
                    </VStack>
                    {erFødsel && <Fødsel />}
                    {erFødsel === false && <Adopsjon />}
                    <VStack gap="20">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack>
                            <StepButtonsHookForm<OmBarnet>
                                saveDataOnPreviousClick={lagreOmBarnet}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default OmBarnetSteg;
