import { FrilansFormComponents, FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { cleanupFrilansFormData, getInitialFrilansFormValues, mapFrilansDataToSøkerState } from './frilansFormUtils';
import frilansSubformQuestionsConfig from './frilansFormQuestionsConfig';
import {
    Block,
    Step,
    StepButtonWrapper,
    date20YearsAgo,
    dateToday,
    intlUtils,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getNextRouteForFrilans, getPreviousSetStepHref } from 'app/steps/stepsConfig';
import { validateFrilansStart } from './frilansValidation';
import useSøknad from 'app/utils/hooks/useSøknad';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { getFrilansTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

const FrilansStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const søknad = useSøknad();
    const { søker, barn, tilrettelegging } = søknad;

    const onValidSubmitHandler = (values: Partial<FrilansFormData>) => {
        const søkerMedFrilans = mapFrilansDataToSøkerState(søker, values as FrilansFormData);
        const harKunEtAktivtArbeid = søkerHarKunEtAktivtArbeid(
            barn.termindato,
            arbeidsforhold,
            søkerMedFrilans.harJobbetSomFrilans,
            søkerMedFrilans.harJobbetSomSelvstendigNæringsdrivende,
        );
        if (harKunEtAktivtArbeid) {
            const tilretteleggingOptions = [getFrilansTilretteleggingOption(tilrettelegging)];
            return [actionCreator.setSøker(søkerMedFrilans), actionCreator.setTilrettelegging(tilretteleggingOptions)];
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
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        useNoTempSavingText={true}
                    >
                        <FrilansFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupFrilansFormData(values, visibility)}
                        >
                            <Block padBottom="xxl" visible={visibility.isVisible(FrilansFormField.frilansFom)}>
                                <FrilansFormComponents.DatePicker
                                    name={FrilansFormField.frilansFom}
                                    label={intlUtils(intl, 'frilans.oppstart')}
                                    validate={validateFrilansStart(intl)}
                                    maxDate={dateToday}
                                    minDate={date20YearsAgo}
                                    showYearSelector={true}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(FrilansFormField.jobberFremdelesSomFrilanser)}
                            >
                                <FrilansFormComponents.YesOrNoQuestion
                                    name={FrilansFormField.jobberFremdelesSomFrilanser}
                                    legend={intlUtils(intl, 'frilans.jobberFremdelesSomFrilans')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.jobberFremdelesSomFrilans.påkrevd'),
                                        )
                                    }
                                />
                            </Block>
                            {/* <Block padBottom="xxl" visible={visibility.isVisible(FrilansFormField.frilansTom)}>
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
                                        formValues.frilansFom!,
                                    )}
                                />
                            </Block> */}
                            <Block padBottom="l">
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
