import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { egenNæringId } from 'app/types/EgenNæring';
import { frilansId } from 'app/types/Frilans';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

import ArbeidIUtlandetFieldArray, { NEW_ARBEID_I_UTLANDET } from './ArbeidIUtlandetFieldArray';
import './arbeidIUtlandet.css';

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
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));

    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const onSubmit = (values: ArbeidIUtlandet) => {
        oppdaterArbeidIUtlandet(values);

        const { nextRoute, nextTilretteleggingId } = getNextRouteValgAvArbeidEllerSkjema(
            barnet.termindato,
            arbeidsforhold,
            inntektsinformasjon,
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
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <ArbeidIUtlandetFieldArray />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default ArbeidIUtlandetStep;
