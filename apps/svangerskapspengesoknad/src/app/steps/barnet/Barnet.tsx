import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { useIntl } from 'react-intl';
import { BarnetFormComponents, BarnetFormData, BarnetFormField } from './barnetFormConfig';
import { cleanupOmBarnetFormData, getBarnetInitialValues, mapOmBarnetFormDataToState } from './barnetUtils';
import barnetQuestionsConfig from './barnetQuestionsConfig';
import stepConfig from '../stepsConfig';
import actionCreator from 'app/context/action/actionCreator';
import { Button } from '@navikt/ds-react';
import { validateFødselsdato, validateTermindato } from './omBarnetValidering';
import dayjs from 'dayjs';
import useSøknad from 'app/utils/hooks/useSøknad';

const Barnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const { barn } = useSøknad();
    const onValidSubmitHandler = (values: Partial<BarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values);
        return [actionCreator.setBarn(barn)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.BARNET //TODO
    );

    return (
        <BarnetFormComponents.FormikWrapper
            initialValues={getBarnetInitialValues(barn)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = barnetQuestionsConfig.getVisbility({
                    ...formValues,
                } as BarnetFormData);

                const visGåVidereKnapp = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="barnet"
                        pageTitle={intlUtils(intl, 'steps.label.barnet')}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                    >
                        <BarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            <Block padBottom="l" visible={true}>
                                <BarnetFormComponents.YesOrNoQuestion
                                    name={BarnetFormField.erBarnetFødt}
                                    legend={intlUtils(intl, 'barnet.erBarnetFødt')}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(BarnetFormField.fødselsdato)}>
                                <BarnetFormComponents.DatePicker
                                    name={BarnetFormField.fødselsdato}
                                    label={intlUtils(intl, 'barnet.fødselsdato')}
                                    minDate={undefined} //TODO {dayjs().subtract(3, 'years').toDate()}
                                    maxDate={dayjs().toDate()}
                                    validate={validateFødselsdato(intl)}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block padBottom="l" visible={true}>
                                <BarnetFormComponents.DatePicker
                                    name={BarnetFormField.termindato}
                                    label={intlUtils(intl, 'barnet.termindato')}
                                    placeholder={'dd.mm.åååå'}
                                    minDate={undefined} //TODO
                                    maxDate={undefined} //TODO
                                    validate={validateTermindato(intl)}
                                />
                            </Block>
                            <Block margin="l">
                                <StepButtonWrapper>
                                    {visGåVidereKnapp && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
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
