import { Block, Step, StepButtonWrapper, intlUtils, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { useIntl } from 'react-intl';
import { BarnetFormComponents, BarnetFormData, BarnetFormField } from './barnetFormConfig';
import { cleanupOmBarnetFormData, getBarnetInitialValues, mapOmBarnetFormDataToState } from './barnetUtils';
import barnetQuestionsConfig from './barnetQuestionsConfig';
import stepConfig from '../stepsConfig';
import actionCreator from 'app/context/action/actionCreator';
import { Button } from '@navikt/ds-react';
import { validateFødselsdato, validateTermindato } from './barnetValidering';
import dayjs from 'dayjs';
import useSøknad from 'app/utils/hooks/useSøknad';
import { ReadMore } from '@navikt/ds-react';
import { niMånederFremITid, halvannetÅrSiden, etÅrSiden } from 'app/utils/dateUtils';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';

const Barnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const { barn } = useSøknad();
    const onValidSubmitHandler = (values: Partial<BarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values);
        return [actionCreator.setBarn(barn)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <BarnetFormComponents.FormikWrapper
            initialValues={getBarnetInitialValues(barn)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = barnetQuestionsConfig.getVisbility({
                    ...formValues,
                } as BarnetFormData);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="barnet"
                        pageTitle={intlUtils(intl, 'steps.label.barnet')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <BarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            <Block padBottom="xl" visible={true}>
                                <BarnetFormComponents.YesOrNoQuestion
                                    name={BarnetFormField.erBarnetFødt}
                                    legend={intlUtils(intl, 'barnet.erBarnetFødt')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.barnet.erBarnetFødt.påkrevd')
                                        )
                                    }
                                />
                                <ReadMore size="small" header={intlUtils(intl, 'barnet.erBarnetFødt.merInfo.tittel')}>
                                    {intlUtils(intl, 'barnet.erBarnetFødt.merInfo.tekst')}
                                </ReadMore>
                            </Block>
                            <Block padBottom="xxl" visible={visibility.isVisible(BarnetFormField.fødselsdato)}>
                                <BarnetFormComponents.DatePicker
                                    name={BarnetFormField.fødselsdato}
                                    label={intlUtils(intl, 'barnet.fødselsdato')}
                                    minDate={halvannetÅrSiden(new Date())}
                                    maxDate={dayjs().toDate()}
                                    validate={validateFødselsdato(intl)}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block padBottom="xxl" visible={true}>
                                <BarnetFormComponents.DatePicker
                                    name={BarnetFormField.termindato}
                                    label={intlUtils(intl, 'barnet.termindato')}
                                    placeholder={'dd.mm.åååå'}
                                    minDate={etÅrSiden(new Date())}
                                    maxDate={niMånederFremITid(new Date())}
                                    validate={validateTermindato(intl, formValues.fødselsdato)}
                                />
                                <ReadMore size="small" header={intlUtils(intl, 'barnet.termindato.merInfo.tittel')}>
                                    {intlUtils(intl, 'barnet.termindato.merInfo.tekst')}
                                </ReadMore>
                            </Block>
                            <Block margin="l">
                                <StepButtonWrapper>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </BarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Barnet;
