import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { ArbeidIUtlandet, ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, ArbeidsforholdOgInntektSvp } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import ArbeidIUtlandetFieldArray, { NEW_ARBEID_I_UTLANDET } from './ArbeidIUtlandetFieldArray';
import './arbeidIUtlandet.css';

const getNextRoute = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
): SøknadRoutes => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    return harKunEtArbeid ? SøknadRoutes.SKJEMA : SøknadRoutes.VELG_ARBEID;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const ArbeidIUtlandetStep: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));

    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);

    const onSubmit = (values: ArbeidIUtlandet) => {
        oppdaterArbeidIUtlandet({
            arbeidIUtlandet: values.arbeidIUtlandet.map((v) => ({
                ...v,
                type: ArbeidIUtlandetType.JOBB_I_UTLANDET,
            })),
        });

        return navigator.goToNextStep(getNextRoute(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt));
    };

    const formMethods = useForm<ArbeidIUtlandet>({
        shouldUnregister: true,
        defaultValues: arbeidIUtlandet || {
            arbeidIUtlandet: [NEW_ARBEID_I_UTLANDET],
        },
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <ArbeidIUtlandetFieldArray />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};

export default ArbeidIUtlandetStep;
