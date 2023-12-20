import { Heading, Radio } from '@navikt/ds-react';
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
import { HvemPlanlegger, isFar, isFarOgFar, isMor, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { notEmpty } from '@navikt/fp-validation';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm<HvemPlanlegger>();
    const intl = useIntl();

    const hvem = formMethods.watch('type');

    const hvemPlanlegger = notEmpty(usePlanleggerStateData(PlanleggerDataType.HVEM_PLANLEGGER));

    const navnMor = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåMor : undefined;
    const navnFar = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåFar : undefined;

    const navnBareMor = isMor(hvemPlanlegger) ? hvemPlanlegger.navnPåBareMor : undefined;
    const navnBareFar = isFar(hvemPlanlegger) ? hvemPlanlegger.navnPåBareFar : undefined;

    const navnMedmor = isMorOgMedmor(hvemPlanlegger) ? hvemPlanlegger.navnPåMedmor : undefined;
    const navnMedfar = isFarOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåMedfar : undefined;

    const lagreArbeidssituasjon = usePlanleggerStateSaveFn(PlanleggerDataType.ARBEIDSSITUASJON);
    const lagre = (formValues: any) => {
        lagreArbeidssituasjon(formValues);
        navigator.goToNextStep(Path.PERIODE);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Block margin="xl">
                    <Block padBottom="xl">
                        <Heading size="medium">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.tittel')} />
                        </Heading>
                    </Block>
                    <Block padBottom="xl">
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnMor })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-mor">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnMor })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnMor })}
                                />
                            </div>
                        </RadioGroup>
                    </Block>
                    <Block>
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnFar })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-far">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                        </RadioGroup>
                    </Block>
                </Block>
                {hvem === SøkersituasjonEnum.MOR && (
                    <Block>
                        <Heading size="medium">
                            <FormattedMessage id="arbeid.tittel" />
                        </Heading>
                        <Block margin="xl">
                            <Heading size="small">
                                <FormattedMessage id={intlUtils(intl, 'arbeid.tittel')} />
                            </Heading>
                            <RadioGroup name="arbeidssituasjon-mor">
                                <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                    <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: navnBareMor,
                                        })}
                                    />
                                </div>
                                <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                    <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnBareMor })}
                                    />
                                </div>
                            </RadioGroup>
                        </Block>
                    </Block>
                )}
                {hvem === SøkersituasjonEnum.FAR && (
                    <Block>
                        <Heading size="medium">
                            <FormattedMessage id="arbeid.tittel" />
                        </Heading>
                        <Block margin="xl">
                            <Heading size="small">
                                <FormattedMessage id={intlUtils(intl, 'arbeid.tittel')} />
                            </Heading>
                            <RadioGroup name="arbeidssituasjon-mor">
                                <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                    <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                            navn: navnBareFar,
                                        })}
                                    />
                                </div>
                                <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                    <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                                </Radio>
                                <div className="beskrivelse">
                                    <FormattedMessage
                                        id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnBareFar })}
                                    />
                                </div>
                            </RadioGroup>
                        </Block>
                    </Block>
                )}
                {hvem === SøkersituasjonEnum.MOR_OG_FAR && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.tittel')} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-mor">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnMor })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnMor })}
                                />
                            </div>
                        </RadioGroup>
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnFar })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-far">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                        </RadioGroup>
                    </Block>
                )}
                {hvem === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.tittel')} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-mor">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', {
                                        navn: navnMor,
                                    })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnMor })}
                                />
                            </div>
                        </RadioGroup>
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnMedmor })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-far">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnMedmor })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnMedmor })}
                                />
                            </div>
                        </RadioGroup>
                    </Block>
                )}
                {hvem === SøkersituasjonEnum.FAR_OG_FAR && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnFar })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-far">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnFar })}
                                />
                            </div>
                        </RadioGroup>
                        <Heading size="small">
                            <FormattedMessage id={intlUtils(intl, 'arbeid.hvaGjelder', { navn: navnMedfar })} />
                        </Heading>
                        <RadioGroup name="arbeidssituasjon-far">
                            <Radio value={ArbeidssituasjonEnum.JOBBER}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobber')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobber.beskrivelse', { navn: navnMedfar })}
                                />
                            </div>
                            <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                                <FormattedMessage id={intlUtils(intl, 'arbeid.jobberIkke')} />
                            </Radio>
                            <div className="beskrivelse">
                                <FormattedMessage
                                    id={intlUtils(intl, 'arbeid.jobberIkke.beskrivelse', { navn: navnMedfar })}
                                />
                            </div>
                        </RadioGroup>
                    </Block>
                )}

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
