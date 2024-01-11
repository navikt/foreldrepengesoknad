import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import {
    Block,
    Step,
    StepButtonWrapper,
    date20YearsAgo,
    dateToday,
    intlUtils,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { getNextRouteForFrilans, getPreviousSetStepHref, useStepConfig } from 'app/steps/stepsConfig';
import { FrilansFormComponents, FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { cleanupFrilansFormData, getInitialFrilansFormValues, mapFrilansDataToSøkerState } from './frilansFormUtils';
import frilansSubformQuestionsConfig from './frilansFormQuestionsConfig';
import { validateFrilansStart } from './frilansValidation';
import { getFrilansTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import BackButton from '../BackButton';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const FrilansStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const tilrettelegging = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGING));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterSøker = useContextSaveData(ContextDataType.SØKER);
    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<FrilansFormData>) => {
        setIsSubmitting(true);

        const søkerMedFrilans = mapFrilansDataToSøkerState(søker, values as FrilansFormData);
        const harKunEtAktivtArbeid = søkerHarKunEtAktivtArbeid(
            barnet.termindato,
            søkerInfo.arbeidsforhold,
            søkerMedFrilans.harJobbetSomFrilans,
            søkerMedFrilans.harJobbetSomSelvstendigNæringsdrivende,
        );
        if (harKunEtAktivtArbeid) {
            const tilretteleggingOptions = [
                getFrilansTilretteleggingOption(tilrettelegging, søkerMedFrilans.frilansInformasjon!),
            ];
            oppdaterTilrettelegging(tilretteleggingOptions);
        }

        oppdaterSøker(søkerMedFrilans);

        const { nextRoute, nextTilretteleggingId } = getNextRouteForFrilans(
            søker,
            barnet.termindato,
            søkerInfo.arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <FrilansFormComponents.FormikWrapper
            initialValues={getInitialFrilansFormValues(søker.frilansInformasjon)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = frilansSubformQuestionsConfig.getVisbility(formValues as FrilansFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="frilans"
                        pageTitle={intlUtils(intl, 'steps.label.frilans')}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
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
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getPreviousSetStepHref('frilans')}
                                    />
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
