import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { DATE_20_YEARS_AGO, DATE_TODAY } from '@navikt/fp-constants';
import { Datepicker, ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { isBeforeTodayOrToday, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { egenNæringId } from 'app/types/EgenNæring';
import { Frilans, frilansId } from 'app/types/Frilans';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

import { getFrilansTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';

const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: Inntektsinformasjon,
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        if (aktiveArbeidsforhold.length === 0) {
            const frilansEllerNæringId = inntektsinformasjon.harJobbetSomFrilans ? frilansId : egenNæringId;
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: frilansEllerNæringId };
        } else {
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: aktiveArbeidsforhold[0].arbeidsgiverId };
        }
    }
    return { nextRoute: SøknadRoutes.VELG_ARBEID };
};

const getNextRoute = (
    inntektsinformasjon: Inntektsinformasjon,
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const route = inntektsinformasjon.harHattArbeidIUtlandet ? SøknadRoutes.ARBEID_I_UTLANDET : undefined;
    const nextRoute = inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende ? SøknadRoutes.NÆRING : route;
    return nextRoute
        ? { nextRoute }
        : getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, inntektsinformasjon);
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const FrilansStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const formMethods = useForm<Frilans>({
        defaultValues: frilans,
    });

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

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

        const { nextRoute, nextTilretteleggingId } = getNextRoute(
            inntektsinformasjon,
            barnet.termindato,
            arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);

        return navigator.goToNextStep(nextRoute);
    };

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
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
                        minDate={DATE_20_YEARS_AGO}
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
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default FrilansStep;
