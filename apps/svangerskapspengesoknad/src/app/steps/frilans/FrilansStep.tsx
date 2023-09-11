import { FrilansFormComponents, FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { getInitialFrilansFormValues, mapFrilansDataToSøkerState } from './frilansFormUtils';
import frilansSubformQuestionsConfig from './frilansFormQuestionsConfig';
import {
    Block,
    Step,
    StepButtonWrapper,
    date20YearsAgo,
    date4WeeksAgo,
    dateToday,
    intlUtils,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getNextRouteForFrilans, getPreviousSetStepHref } from 'app/steps/stepsConfig';
import { validateFrilansSlutt, validateFrilansStart } from './frilansValidation';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { søkerHarKunEtArbeid } from 'app/utils/arbeidsforholdUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { mapTilrettelegging } from 'app/utils/tilretteleggingUtils';

const FrilansStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn, tilrettelegging } = useSøknad();
    const onValidSubmitHandler = (values: Partial<FrilansFormData>) => {
        const søkerMedFrilans = mapFrilansDataToSøkerState(søker, values as FrilansFormData);
        if (
            søkerHarKunEtArbeid(
                barn.termindato,
                arbeidsforhold,
                søkerMedFrilans.harJobbetSomFrilans,
                søkerMedFrilans.harJobbetSomSelvstendigNæringsdrivende
            )
        ) {
            const mappedTilretteleggingsValg = mapTilrettelegging(
                tilrettelegging,
                ['Frilans'],
                søkerMedFrilans,
                arbeidsforhold,
                barn.termindato
            );

            return [
                actionCreator.setSøker(søkerMedFrilans),
                actionCreator.setTilrettelegging(mappedTilretteleggingsValg),
            ];
        }
        return [actionCreator.setSøker(søkerMedFrilans)];
    };
    const nextRoute = getNextRouteForFrilans(søker, barn.termindato, arbeidsforhold);

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    const onAvbrytSøknad = useAvbrytSøknad();
    return (
        <FrilansFormComponents.FormikWrapper
            initialValues={getInitialFrilansFormValues(søker.frilansInformasjon)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = frilansSubformQuestionsConfig.getVisbility(formValues as FrilansFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="frilans"
                        pageTitle={intlUtils(intl, 'steps.label.frilans')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <FrilansFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            // cleanup={(values) => cleanupFrilansFormData(values, visibility)} //TODO
                        >
                            <Block padBottom="l" visible={visibility.isVisible(FrilansFormField.frilansFom)}>
                                <FrilansFormComponents.DatePicker
                                    name={FrilansFormField.frilansFom}
                                    label={intlUtils(intl, 'frilans.oppstart')}
                                    validate={validateFrilansStart(intl, formValues.frilansTom!)}
                                    maxDate={dateToday}
                                    minDate={date20YearsAgo}
                                    showYearSelector={true}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(FrilansFormField.jobberFremdelesSomFrilanser)}
                            >
                                <FrilansFormComponents.YesOrNoQuestion
                                    name={FrilansFormField.jobberFremdelesSomFrilanser}
                                    legend={intlUtils(intl, 'frilans.jobberFremdelesSomFrilans')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.jobberFremdelesSomFrilans.påkrevd')
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(FrilansFormField.frilansTom)}>
                                <FrilansFormComponents.DatePicker
                                    name={FrilansFormField.frilansTom}
                                    label={intlUtils(intl, 'frilans.slutt')}
                                    minDate={getMinInputTilOgMedValue(formValues.frilansFom, date4WeeksAgo)}
                                    maxDate={dateToday}
                                    showYearSelector={true}
                                    placeholder={'dd.mm.åååå'}
                                    validate={validateFrilansSlutt(
                                        intl,
                                        formValues.jobberFremdelesSomFrilanser!,
                                        formValues.frilansFom!
                                    )}
                                />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousSetStepHref('frilans')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </FrilansFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default FrilansStep;
