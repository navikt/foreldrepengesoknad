import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContentWrapper, Step } from '@navikt/fp-ui';

import { AndreInntektskilderFieldArray, FormValues } from './components/AndreInntektskilderFieldArray';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

export const AndreInntektskilderSteg = ({ arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const oppdaterAndreInntektskilder = useContextSaveData(ContextDataType.ANDRE_INNTEKTSKILDER);

    const formMethods = useForm<FormValues>({
        defaultValues: { andreInntektskilder: andreInntektskilder || [{}] },
        shouldUnregister: true,
    });

    const onSubmit = (values: FormValues) => {
        oppdaterAndreInntektskilder(values.andreInntektskilder);
        return navigator.goToNextDefaultStep();
    };

    return (
        <ContentWrapper pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step onCancel={avbrytSøknad} onContinueLater={navigator.fortsettSøknadSenere} steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <AndreInntektskilderFieldArray />
                        <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                    </VStack>
                </RhfForm>
            </Step>
        </ContentWrapper>
    );
};
