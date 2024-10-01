import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { ArbeidIUtlandet } from 'types/ArbeidIUtlandet';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, ArbeidsforholdOgInntektSvp } from '@navikt/fp-types';
import { egenNæringId } from '@navikt/fp-types/src/EgenNæring';
import { frilansId } from '@navikt/fp-types/src/Frilans';
import { Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import ArbeidIUtlandetFieldArray, { NEW_ARBEID_I_UTLANDET } from './ArbeidIUtlandetFieldArray';
import './arbeidIUtlandet.css';

const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
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
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const onSubmit = (values: ArbeidIUtlandet) => {
        oppdaterArbeidIUtlandet(values);

        const { nextRoute, nextTilretteleggingId } = getNextRouteValgAvArbeidEllerSkjema(
            barnet.termindato,
            arbeidsforhold,
            arbeidsforholdOgInntekt,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);

        return navigator.goToNextStep(nextRoute);
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
            onStepChange={navigator.goToNextStep}
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
