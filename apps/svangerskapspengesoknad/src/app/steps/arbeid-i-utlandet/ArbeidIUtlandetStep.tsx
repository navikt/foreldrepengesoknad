import { VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import {
    getBackLinkForArbeidIUtlandetSteg,
    getNextRouteValgAvArbeidEllerSkjema,
    useStepConfig,
} from 'app/steps/stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import ArbeidIUtlandetFieldArray from './ArbeidIUtlandetFieldArray';
import { getInitialArbeidIUtlandetFormData } from './arbeidIUtlandetFormUtils';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';

import './arbeidIUtlandet.css';

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
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const stepConfig = useStepConfig(intl, arbeidsforhold);

    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));

    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: ArbeidIUtlandet) => {
        oppdaterArbeidIUtlandet(values);

        const { nextRoute, nextTilretteleggingId } = getNextRouteValgAvArbeidEllerSkjema(
            barnet.termindato,
            arbeidsforhold,
            inntektsinformasjon,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<ArbeidIUtlandet>({
        defaultValues: getInitialArbeidIUtlandetFormData(arbeidIUtlandet),
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="arbeidIUtlandet"
            pageTitle={intl.formatMessage({ id: 'steps.label.arbeidIUtlandet' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <ArbeidIUtlandetFieldArray />
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            oppdaterAppRoute(getBackLinkForArbeidIUtlandetSteg(inntektsinformasjon));
                            mellomlagreSøknadOgNaviger();
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default ArbeidIUtlandetStep;
