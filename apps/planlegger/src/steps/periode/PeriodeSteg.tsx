import { BodyLong, Heading, Radio } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, intlUtils } from '@navikt/fp-common';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { PlanleggerDataType, usePlanleggerStateData, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';
import { PeriodeEnum } from 'types/Periode';
import HvorforSpørViOmDette from 'components/expansion-card/HvorforSpørViOmDette';
import { notEmpty } from '@navikt/fp-validation';
import { HvemPlanlegger, isMorOgFar } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm<HvemPlanlegger>();
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(usePlanleggerStateData(PlanleggerDataType.HVEM_PLANLEGGER));
    const hvem = formMethods.watch('type');
    const navnMor = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåMor : undefined;
    const navnFar = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåFar : undefined;

    const lagrePeriode = usePlanleggerStateSaveFn(PlanleggerDataType.PERIODE);

    const lagre = (formValues: any) => {
        lagrePeriode(formValues);
        navigator.goToNextStep(Path.PLAN_INFO);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="medium">
                    <FormattedMessage id="periode.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="small">
                        <FormattedMessage id="periode.hvaGjelder" />
                    </Heading>
                    <RadioGroup name="periode">
                        <Radio value={PeriodeEnum.HUNDRE}>
                            <FormattedMessage id="periode.100" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage
                                id={intlUtils(intl, 'periode.100.beskrivelse', {
                                    navn1: navnMor,
                                    kr1: '10',
                                    navn2: navnFar,
                                    kr2: '12',
                                })}
                            />
                        </div>
                        <Radio value={PeriodeEnum.ÅTTI}>
                            <FormattedMessage id="periode.80" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage
                                id={intlUtils(intl, 'periode.100.beskrivelse', {
                                    navn1: navnMor,
                                    kr1: '10',
                                    navn2: navnFar,
                                    kr2: '12',
                                })}
                            />
                        </div>
                    </RadioGroup>
                </Block>
                <Block margin="xl" className="border">
                    <Heading size="small">
                        <FormattedMessage id="periode.ikkeDekketTittel" />
                    </Heading>

                    <div className="mt-10">
                        <BodyLong>
                            <FormattedMessage id="periode.ikkeDekketTekst" />
                        </BodyLong>
                    </div>
                </Block>
                <Block margin="xl">
                    <Heading size="small">
                        <FormattedMessage id="periode.utbetalingTittel" />
                    </Heading>
                    <Block margin="l">
                        <FormattedMessage id="periode.utbetalingTekst" />
                    </Block>
                    <Block margin="l">
                        <FormattedMessage id="periode.utbetalingTekst.del2" />
                    </Block>
                </Block>

                {hvem === SøkersituasjonEnum.MOR_OG_FAR && (
                    <>
                        <Block margin="xl">
                            <Heading size="small">
                                <FormattedMessage id="periode.hvaGjelder" />
                            </Heading>
                            <RadioGroup name="periode">
                                <Radio value={PeriodeEnum.HUNDRE}>
                                    <FormattedMessage id="periode.100" />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'periode.100.beskrivelse', {
                                            navn1: navnMor,
                                            kr1: '10',
                                            navn2: navnFar,
                                            kr2: '12',
                                        })}
                                    />
                                </div>
                                <Radio value={PeriodeEnum.ÅTTI}>
                                    <FormattedMessage id="periode.80" />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'periode.100.beskrivelse', {
                                            navn1: navnMor,
                                            kr1: '10',
                                            navn2: navnFar,
                                            kr2: '12',
                                        })}
                                    />
                                </div>
                            </RadioGroup>
                        </Block>
                        <Block margin="xl" className="border">
                            <Heading size="small">
                                <FormattedMessage id="periode.ikkeDekketTittel" />
                            </Heading>

                            <div className="mt-10">
                                <BodyLong>
                                    <FormattedMessage id="periode.ikkeDekketTekst" />
                                </BodyLong>
                            </div>
                        </Block>
                        <Block margin="xl">
                            <Heading size="small">
                                <FormattedMessage id="periode.utbetalingTittel" />
                            </Heading>
                            <Block margin="l">
                                <FormattedMessage id="periode.utbetalingTekst" />
                            </Block>
                            <Block margin="l">
                                <FormattedMessage id="periode.utbetalingTekst.del2" />
                            </Block>
                        </Block>
                    </>
                )}

                <HvorforSpørViOmDette />

                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={lagrePeriode}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonText="Neste"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default PeriodeSteg;
