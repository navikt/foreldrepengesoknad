import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import {
    Block,
    Step,
    StepButtonWrapper,
    convertYesOrNoOrUndefinedToBoolean,
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
import { cleanupFrilansFormData, getInitialFrilansFormValues } from './frilansFormUtils';
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

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<FrilansFormData>) => {
        setIsSubmitting(true);

        const harKunEtAktivtArbeid = søkerHarKunEtAktivtArbeid(
            barnet.termindato,
            søkerInfo.arbeidsforhold,
            inntektsinformasjon.harJobbetSomFrilans,
            inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
        );
        if (harKunEtAktivtArbeid) {
            const tilretteleggingOptions = [getFrilansTilretteleggingOption(tilrettelegginger, values.frilansFom!)];
            oppdaterTilrettelegginger(tilretteleggingOptions);
        }

        oppdaterFrilans({
            jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser),
            oppstart: values.frilansFom!,
        });

        const { nextRoute, nextTilretteleggingId } = getNextRouteForFrilans(
            inntektsinformasjon,
            barnet.termindato,
            søkerInfo.arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <FrilansFormComponents.FormikWrapper
            initialValues={getInitialFrilansFormValues(frilans)}
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
