import { BodyLong, ExpansionCard, Heading, Radio } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import Info from 'components/ikoner/Info';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';
import { PeriodeEnum } from './../../types/Periode';

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm();

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
                            <FormattedMessage id="periode.100.beskrivelse" />
                        </div>
                        <Radio value={PeriodeEnum.ÅTTI}>
                            <FormattedMessage id="periode.80" />
                        </Radio>
                        <div className="beskrivelse">
                            <FormattedMessage id="periode.80.beskrivelse" />
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
                            saveDataOnPreviousClick={lagrePeriode}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                        />
                    </StepButtonWrapper>
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default PeriodeSteg;
