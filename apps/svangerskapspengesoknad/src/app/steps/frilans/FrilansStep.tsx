import { Radio, VStack } from '@navikt/ds-react';
import { Step, date20YearsAgo } from '@navikt/fp-common';
import { DATE_TODAY } from '@navikt/fp-constants';
import { Datepicker, ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { isBeforeTodayOrToday, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import { getNextRouteForFrilans, useStepConfig } from 'app/steps/stepsConfig';
import { Frilans } from 'app/types/Frilans';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { getFrilansTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const FrilansStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const navigate = useNavigate();

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const formMethods = useForm<Frilans>({
        defaultValues: frilans,
    });

    const onSubmit = (values: Frilans) => {
        const harKunEtAktivtArbeid = søkerHarKunEtAktivtArbeid(
            barnet.termindato,
            arbeidsforhold,
            inntektsinformasjon.harJobbetSomFrilans,
            inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
        );
        if (harKunEtAktivtArbeid) {
            const tilretteleggingOptions = [getFrilansTilretteleggingOption(tilrettelegginger || [], values.oppstart)];
            oppdaterTilrettelegginger(tilretteleggingOptions);
        }

        oppdaterFrilans(values);

        const { nextRoute, nextTilretteleggingId } = getNextRouteForFrilans(
            inntektsinformasjon,
            barnet.termindato,
            arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="frilans"
            pageTitle={intl.formatMessage({ id: 'steps.label.frilans' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <Datepicker
                        name="oppstart"
                        label={intl.formatMessage({ id: 'frilans.oppstart' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' })),
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' }),
                            ),
                        ]}
                        maxDate={DATE_TODAY}
                        minDate={date20YearsAgo}
                    />
                    <RadioGroup
                        name="jobberFremdelesSomFrilans"
                        label={intl.formatMessage({ id: 'frilans.jobberFremdelesSomFrilans' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.jobberFremdelesSomFrilans.påkrevd' })),
                        ]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="frilans.jobberFremdelesSomFrilans.ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="frilans.jobberFremdelesSomFrilans.nei" />
                        </Radio>
                    </RadioGroup>
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            oppdaterAppRoute(SøknadRoutes.ARBEID);
                            navigate(SøknadRoutes.ARBEID);
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default FrilansStep;
