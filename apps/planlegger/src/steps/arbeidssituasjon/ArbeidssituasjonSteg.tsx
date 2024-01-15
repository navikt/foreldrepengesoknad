import { Heading, Radio, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { notEmpty } from '@navikt/fp-validation';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: useContextGetData(ContextDataType.ARBEIDSSITUASJON),
    });
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagreArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);
    const lagre = (formValues: Arbeidssituasjon) => {
        lagreArbeidssituasjon(formValues);
        navigator.goToNextStep(PlanleggerRoutes.PERIODE);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading size="large">
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR && (
                        <VStack gap="10">
                            <RadioGroup name="arbeidssituasjonMor">
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER}
                                    description={intl.formatMessage({ id: 'arbeid.jobber.beskrivelseDeg' })}
                                >
                                    <FormattedMessage id="arbeid.jobber" />
                                </Radio>
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                    description={intl.formatMessage({ id: 'arbeid.jobberIkke.beskrivelseDeg' })}
                                >
                                    <FormattedMessage id="arbeid.jobberIkke" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.FAR && (
                        <VStack gap="10">
                            <RadioGroup name="arbeidssituasjonFar">
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER}
                                    description={intl.formatMessage({ id: 'arbeid.jobber.beskrivelseDeg' })}
                                >
                                    <FormattedMessage id="arbeid.jobber" />
                                </Radio>
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                    description={intl.formatMessage({ id: 'arbeid.jobberIkke.beskrivelseDeg' })}
                                >
                                    <FormattedMessage id="arbeid.jobberIkke" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR && (
                        <VStack gap="10">
                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>

                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>

                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåFar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonFar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåFar,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id={intl.formatMessage({ id: 'arbeid.jobber' })} />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },

                                            { navn: hvemPlanlegger.navnPåFar },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                        <VStack gap="10">
                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>
                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMedmor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMedmor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMedmor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMedmor,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR && (
                        <VStack gap="5">
                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåFar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonFar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåFar,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id={intl.formatMessage({ id: 'arbeid.jobber' })} />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },

                                            { navn: hvemPlanlegger.navnPåFar },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>
                            <VStack gap="1">
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMedfar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMedfar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobber.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMedfar,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intl.formatMessage(
                                            { id: 'arbeid.jobberIkke.beskrivelse' },
                                            {
                                                navn: hvemPlanlegger.navnPåMedfar,
                                            },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>
                        </VStack>
                    )}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack className="button-wrapper content-wrapper">
                            <StepButtonsHookForm
                                saveDataOnPreviousClick={lagreArbeidssituasjon}
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

export default ArbeidssituasjonSteg;
