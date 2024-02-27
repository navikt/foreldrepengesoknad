import { Radio, VStack } from '@navikt/ds-react';
import { Form, RadioGroup, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/GreenPanel';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import { SøkersituasjonEnum } from '../../types/Søkersituasjon';

const HvemPlanleggerSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);
    const formMethods = useForm<HvemPlanlegger>({ defaultValues: hvemPlanlegger });
    const intl = useIntl();
    const planleggerType = formMethods.watch('type');

    const lagreHvemPlanlegger = useContextSaveData(ContextDataType.HVEM_PLANLEGGER);
    const lagre = (formValues: HvemPlanlegger) => {
        lagreHvemPlanlegger(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="10">
                        <GreenPanel>
                            <RadioGroup
                                name="type"
                                label={intl.formatMessage({
                                    id: 'HvemPlanleggerSteg.HvemPlanlegger',
                                })}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'feilmelding.hvemPlanlegger.duMåOppgi',
                                        }),
                                    ),
                                ]}
                            >
                                <Radio value={SøkersituasjonEnum.MOR_OG_FAR}>
                                    <FormattedMessage id="hvem.morOgFar" />
                                </Radio>
                                <Radio value={SøkersituasjonEnum.MOR_OG_MEDMOR}>
                                    <FormattedMessage id="hvem.morOgMedmor" />
                                </Radio>
                                <Radio value={SøkersituasjonEnum.FAR_OG_FAR}>
                                    <FormattedMessage id="hvem.farOgFar" />
                                </Radio>
                                <Radio value={SøkersituasjonEnum.MOR}>
                                    <FormattedMessage id="hvem.bareMor" />
                                </Radio>
                                <Radio value={SøkersituasjonEnum.FAR}>
                                    <FormattedMessage id="hvem.bareFar" />
                                </Radio>
                            </RadioGroup>
                        </GreenPanel>
                    </VStack>
                    {planleggerType === SøkersituasjonEnum.MOR_OG_FAR && (
                        <VStack gap="5">
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.mor' })}
                                    name="navnPåMor"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnMor.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.far' })}
                                    name="navnPåFar"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnFar.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                        <VStack gap="5">
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.mor' })}
                                    name="navnPåMor"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnMor.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.medmor' })}
                                    name="navnPåMedmor"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnMedmor.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.FAR_OG_FAR && (
                        <VStack gap="5">
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.far' })}
                                    name="navnPåFar"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnFar.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.far' })}
                                    name="navnPåMedfar"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnMedfar.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.MOR && (
                        <VStack gap="5">
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.mor' })}
                                    name="navnPåMor"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnMor.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.FAR && (
                        <VStack gap="5">
                            <div className="panel green">
                                <TextField
                                    label={intl.formatMessage({ id: 'navn.far' })}
                                    name="navnPåFar"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.hvemPlanlegger.navnFar.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                        </VStack>
                    )}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack>
                            <StepButtonsHookForm
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                nextButtonText="Neste"
                                previousButtonText="Tilbake"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default HvemPlanleggerSteg;
