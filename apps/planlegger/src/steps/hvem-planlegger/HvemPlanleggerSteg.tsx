import { Heading, Radio } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Block, intlUtils } from '@navikt/fp-common';
import usePlanleggerNavigator from '../../appData/usePlanleggerNavigator';
import { SøkersituasjonEnum } from '../../types/Søkersituasjon';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Path } from 'appData/paths';
import HvorforSpørViOmDette from 'components/expansion-card/HvorforSpørViOmDette';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

const HvemPlanleggerSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm<HvemPlanlegger>();
    const intl = useIntl();
    const hvemPlanlegger = formMethods.watch('type');

    const lagreHvemPlanlegger = usePlanleggerStateSaveFn(PlanleggerDataType.HVEM_PLANLEGGER);
    const lagre = (formValues: HvemPlanlegger) => {
        lagreHvemPlanlegger(formValues);
        navigator.goToNextStep(Path.OM_BARNET);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="medium">
                    <FormattedMessage id="hvem.tittel" />
                    <RadioGroup name="type">
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
                            <TextField label={intlUtils(intl, 'navn.mor')} name="navnPåMor" />
                        </div>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.far')} name="navnPåFar" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.MOR_OG_MEDMOR && (
                    <Block>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.mor')} name="navnPåMor" />
                        </div>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.medmor')} name="navnPåMedmor" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.FAR_OG_FAR && (
                    <Block>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.far')} name="navnPåFar" />
                        </div>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.far')} name="navnPåMedFar" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.MOR && (
                    <Block>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.mor')} name="navnPåBareMor" />
                        </div>
                    </Block>
                )}
                {hvemPlanlegger === SøkersituasjonEnum.FAR && (
                    <Block>
                        <div className="mt-10">
                            <TextField label={intlUtils(intl, 'navn.far')} name="navnPåBareFar" />
                        </div>
                    </Block>
                )}
                <HvorforSpørViOmDette />

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
