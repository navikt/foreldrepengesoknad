import { Box, Heading, Radio, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import { SøkersituasjonEnum } from '../../types/Søkersituasjon';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { isRequired } from '@navikt/fp-validation';

const HvemPlanleggerSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);
    const formMethods = useForm<HvemPlanlegger>({ defaultValues: hvemPlanlegger });
    const intl = useIntl();
    const planleggerType = formMethods.watch('type');

    const lagreHvemPlanlegger = useContextSaveData(ContextDataType.HVEM_PLANLEGGER);
    const lagre = (formValues: HvemPlanlegger) => {
        lagreHvemPlanlegger(formValues);
        navigator.goToNextStep(PlanleggerRoutes.OM_BARNET);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="10">
                        <Heading size="large">
                            <FormattedMessage id="hvem.tittel" />
                        </Heading>
                        <RadioGroup
                            name="type"
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
                    </VStack>
                    {planleggerType === SøkersituasjonEnum.MOR_OG_FAR && (
                        <VStack gap="5">
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                        <VStack gap="5">
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.FAR_OG_FAR && (
                        <VStack gap="5">
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.MOR && (
                        <VStack gap="5">
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                        </VStack>
                    )}
                    {planleggerType === SøkersituasjonEnum.FAR && (
                        <VStack gap="5">
                            <Box padding="4" background="surface-alt-3-subtle" borderRadius="xlarge">
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
                            </Box>
                        </VStack>
                    )}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack className="button-wrapper content-wrapper">
                            <StepButtonsHookForm
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                nextButtonText="Neste"
                                previousButtonText="Tilbake"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </ContentWrapper>
    );
};

export default HvemPlanleggerSteg;
