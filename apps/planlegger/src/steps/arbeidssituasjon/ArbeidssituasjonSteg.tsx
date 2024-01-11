import { Heading, Radio, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, intlUtils } from '@navikt/fp-common';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { PlanleggerDataType, usePlanleggerStateData, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import HvorforSpørViOmDette from 'components/expansion-card/HvorforSpørViOmDette';
import { notEmpty } from '@navikt/fp-validation';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

type FormValues = {
    arbeidssituasjonMor?: boolean;
    arbeidssituasjonFar?: boolean;
    arbeidssituasjonMedmor?: boolean;
    arbeidssituasjonMedfar?: boolean;
};

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm<FormValues>();
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(usePlanleggerStateData(PlanleggerDataType.HVEM_PLANLEGGER));

    const lagreArbeidssituasjon = usePlanleggerStateSaveFn(PlanleggerDataType.ARBEIDSSITUASJON);
    const lagre = (formValues: any) => {
        lagreArbeidssituasjon(formValues);
        navigator.goToNextStep(Path.PERIODE);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading size="large" spacing>
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR && (
                        <VStack gap="10">
                            <RadioGroup name="arbeidssituasjonMor">
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER}
                                    description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                        navn: hvemPlanlegger.navnPåMor,
                                    })}
                                >
                                    <FormattedMessage id="arbeid.jobber" />
                                </Radio>
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                    description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                        navn: hvemPlanlegger.navnPåMor,
                                    })}
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
                                    description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                        navn: hvemPlanlegger.navnPåFar,
                                    })}
                                >
                                    <FormattedMessage id="arbeid.jobber" />
                                </Radio>
                                <Radio
                                    value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                    description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                        navn: hvemPlanlegger.navnPåFar,
                                    })}
                                >
                                    <FormattedMessage id="arbeid.jobberIkke" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR && (
                        <VStack gap="10">
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>

                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåFar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonFar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåFar,
                                        })}
                                    >
                                        <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(
                                            intl,
                                            'arbeid.jobberIkke.beskrivelse',

                                            { navn: hvemPlanlegger.navnPåFar },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                        <VStack gap="10">
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMedmor }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMedmor">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMedmor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMedmor,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR && (
                        <VStack gap="10">
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåFar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonFar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåFar,
                                        })}
                                    >
                                        <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(
                                            intl,
                                            'arbeid.jobberIkke.beskrivelse',

                                            { navn: hvemPlanlegger.navnPåFar },
                                        )}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage
                                        id={'arbeid.hvaGjelder'}
                                        values={{ navn: hvemPlanlegger.navnPåMedfar }}
                                    />
                                </Heading>
                                <RadioGroup name="arbeidssituasjonMedfar">
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER}
                                        description={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMedfar,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobber" />
                                    </Radio>
                                    <Radio
                                        value={ArbeidssituasjonEnum.JOBBER_IKKE}
                                        description={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', {
                                            navn: hvemPlanlegger.navnPåMedfar,
                                        })}
                                    >
                                        <FormattedMessage id="arbeid.jobberIkke" />
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </VStack>
                    )}
                </VStack>

                <HvorforSpørViOmDette />
                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={lagreArbeidssituasjon}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonText="Neste"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default ArbeidssituasjonSteg;
