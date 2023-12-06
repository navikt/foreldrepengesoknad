import { ExpansionCard, Heading, Radio } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import useEsNavigator from '../../appData/useEsNavigator';
import Info from 'components/ikoner/Info';
import { EsDataType, useEsStateSaveFn } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ArbeidssituasjonEnum } from './../../types/Arbeidssituasjon';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = useEsNavigator();
    const formMethods = useForm();

    const lagreArbeidssituasjon = useEsStateSaveFn(EsDataType.ARBEIDSSITUASJON);

    const lagre = (formValues: any) => {
        lagreArbeidssituasjon(formValues);
        navigator.goToNextStep(Path.PERIODE);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="medium">
                    <FormattedMessage id="arbeid.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="small">
                        <FormattedMessage id="arbeid.hvaGjelder" />
                    </Heading>
                    <RadioGroup name="arbeidssituasjon-mor">
                        <Radio value={ArbeidssituasjonEnum.JOBBER}>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage id="arbeid.jobber.beskrivelse" />
                        </div>
                        <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                            <FormattedMessage id="arbeid.jobberIkke" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage id="arbeid.jobberIkke.beskrivelse" />
                        </div>
                    </RadioGroup>
                </Block>

                <Block margin="xl">
                    <Heading size="small">
                        <FormattedMessage id="arbeid.hvaGjelder" />
                    </Heading>
                    <RadioGroup name="arbeidssituasjon-far">
                        <Radio value={ArbeidssituasjonEnum.JOBBER}>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage id="arbeid.jobber.beskrivelse" />
                        </div>
                        <Radio value={ArbeidssituasjonEnum.JOBBER_IKKE}>
                            <FormattedMessage id="arbeid.jobberIkke" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage id="arbeid.jobberIkke.beskrivelse" />
                        </div>
                    </RadioGroup>
                </Block>

                <Block margin="xl">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div className="with-icon">
                                <div className="icon">
                                    <Info />
                                </div>
                                <div>
                                    <ExpansionCard.Title size="medium">
                                        <FormattedMessage id="hvem.info.tittel" />
                                    </ExpansionCard.Title>
                                </div>
                            </div>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <FormattedMessage id="hvem.info.tekst" />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </Block>

                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtonWrapper>
                        <StepButtonsHookForm
                            saveDataOnPreviousClick={lagreArbeidssituasjon}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                        />
                    </StepButtonWrapper>
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default ArbeidssituasjonSteg;
