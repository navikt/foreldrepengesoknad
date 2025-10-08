import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';

import { AndreInntektskilderFieldArray } from './components/AndreInntektskilderFieldArray';
import { AndreInntekterFormValues } from './types/AndreInntekterFormValues';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const AndreInntektskilderSteg = ({ arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const oppdaterAndreInntektskilder = useContextSaveData(ContextDataType.ANDRE_INNTEKTSKILDER);

    const formMethods = useForm<AndreInntekterFormValues>({
        defaultValues: { andreInntektskilder: andreInntektskilder || [{}] },
        shouldUnregister: true,
    });

    const onSubmit = (values: AndreInntekterFormValues) => {
        oppdaterAndreInntektskilder(values.andreInntektskilder);
        return navigator.goToNextDefaultStep();
    };

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        <AndreInntektskilderFieldArray />
                        <StepButtonsHookForm
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            onAvsluttOgSlett={avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
