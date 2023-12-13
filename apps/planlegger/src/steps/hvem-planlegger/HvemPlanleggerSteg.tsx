import { ExpansionCard, Heading, Radio, Textarea } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, intlUtils } from '@navikt/fp-common';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import Info from 'components/ikoner/Info';
import { SøkersituasjonEnum } from '../../types/Søkersituasjon';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';

const HvemPlanleggerSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm();
    const intl = useIntl();
    const hvemPlanlegger = formMethods.watch('hvemPlanlegger');

    const lagreHvemPlanlegger = usePlanleggerStateSaveFn(PlanleggerDataType.HVEM_PLANLEGGER);

    const lagre = (formValues: any) => {
        lagreHvemPlanlegger(formValues);
        navigator.goToNextStep(Path.OM_BARNET);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="medium">
                    <FormattedMessage id="hvem.tittel" />
                    <RadioGroup name="hvemPlanlegger">
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
                </Heading>
                {hvemPlanlegger === SøkersituasjonEnum.MOR_OG_FAR && (
                    <Block>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.mor')} size="small" />
                        </div>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.far')} size="small" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                    <Block>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.mor')} size="small" />
                        </div>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.medmor')} size="small" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.FAR_OG_FAR && (
                    <Block>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.far')} size="small" />
                        </div>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.far')} size="small" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.MOR && (
                    <Block>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.mor')} size="small" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.FAR && (
                    <Block>
                        <div className="mt-10">
                            <Textarea label={intlUtils(intl, 'navn.far')} size="small" />
                        </div>
                    </Block>
                )}
                <Block margin="xl">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div className="with-icon">
                                <div>
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
                    <StepButtonsHookForm
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonText="Neste"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default HvemPlanleggerSteg;
