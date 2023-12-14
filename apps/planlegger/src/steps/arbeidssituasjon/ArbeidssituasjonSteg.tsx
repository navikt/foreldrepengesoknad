import { Heading, Radio } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block } from '@navikt/fp-common';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';
import { ArbeidssituasjonEnum } from './../../types/Arbeidssituasjon';
import HvorforSpørViOmDette from 'components/expansion-card/HvorforSpørViOmDette';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm();

    const lagreArbeidssituasjon = usePlanleggerStateSaveFn(PlanleggerDataType.ARBEIDSSITUASJON);

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
