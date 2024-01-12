import { BodyLong, Box, Heading, Radio, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, intlUtils } from '@navikt/fp-common';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { Periode, PeriodeEnum } from 'types/Periode';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { isMorOgFar } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { notEmpty } from '@navikt/fp-validation';

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const periode = useContextGetData(ContextDataType.PERIODE);
    const formMethods = useForm<Periode>({ defaultValues: periode });
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const navnMor = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåMor : undefined;
    const navnFar = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåFar : undefined;

    const lagrePeriode = useContextSaveData(ContextDataType.PERIODE);

    const lagre = (formValues: Periode) => {
        lagrePeriode(formValues);
        navigator.goToNextStep(PlanleggerRoutes.PLAN_INFO);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading size="large">
                        <FormattedMessage id="periode.tittel" />
                    </Heading>
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR && (
                        <VStack gap="10">
                            <VStack gap="2">
                                <Heading size="small">
                                    <FormattedMessage id="periode.hvaGjelderDeg" />
                                </Heading>
                                <RadioGroup name="periode">
                                    <Radio
                                        value={PeriodeEnum.HUNDRE}
                                        description={intlUtils(intl, 'periode.100.beskrivelseDeg', {
                                            kr1: '10',
                                        })}
                                        className="margin-bottom-2 panel green"
                                    >
                                        <FormattedMessage id="periode.100" />
                                    </Radio>
                                    <Radio
                                        value={PeriodeEnum.ÅTTI}
                                        description={intlUtils(intl, 'periode.80.beskrivelseDeg', {
                                            kr1: '10',
                                        })}
                                        className="margin-bottom-2 panel green"
                                    >
                                        <FormattedMessage id="periode.80" />
                                    </Radio>
                                </RadioGroup>
                            </VStack>

                            <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                                <Heading size="small">
                                    <FormattedMessage id="periode.ikkeDekketTittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="periode.ikkeDekketTekst" />
                                </BodyLong>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <Heading size="small">
                                    <FormattedMessage id="periode.utbetalingTittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="periode.utbetalingTekst" />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage id="periode.utbetalingTekst.del2" />
                                </BodyLong>
                            </Box>
                        </VStack>
                    )}
                    {hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR && (
                        <VStack gap="5">
                            <Heading size="small">
                                <FormattedMessage id="periode.hvaGjelderBegge" />
                            </Heading>
                            <RadioGroup name="periode">
                                <Radio
                                    value={PeriodeEnum.HUNDRE}
                                    description={intlUtils(intl, 'periode.100.beskrivelse', {
                                        navn1: navnMor,
                                        kr1: '10',
                                        navn2: navnFar,
                                        kr2: '12',
                                    })}
                                    className="margin-bottom-2 panel green"
                                >
                                    <FormattedMessage id="periode.100" />
                                </Radio>
                                <Radio
                                    value={PeriodeEnum.ÅTTI}
                                    description={intlUtils(intl, 'periode.100.beskrivelse', {
                                        navn1: navnMor,
                                        kr1: '10',
                                        navn2: navnFar,
                                        kr2: '12',
                                    })}
                                    className="margin-bottom-2 panel green"
                                >
                                    <FormattedMessage id="periode.80" />
                                </Radio>
                            </RadioGroup>

                            <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                                <Heading size="small">
                                    <FormattedMessage id="periode.ikkeDekketTittel" />
                                </Heading>

                                <BodyLong>
                                    <FormattedMessage id="periode.ikkeDekketTekst" />
                                </BodyLong>
                            </Box>

                            <Box padding="4" borderColor="border-alt-3" borderRadius="large" background="bg-subtle">
                                <Heading size="small">
                                    <FormattedMessage id="periode.utbetalingTittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="periode.utbetalingTekst" />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage id="periode.utbetalingTekst.del2" />
                                </BodyLong>
                            </Box>
                        </VStack>
                    )}
                    <HvorforSpørViOmDette />
                    <Block margin="xxl" className="button-wrapper content-wrapper">
                        <StepButtonsHookForm<Periode>
                            saveDataOnPreviousClick={lagrePeriode}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonText="Neste"
                            previousButtonText="Tilbake"
                        />
                    </Block>
                </VStack>
            </Form>
        </ContentWrapper>
    );
};

export default PeriodeSteg;
