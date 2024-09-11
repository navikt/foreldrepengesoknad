import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import useFpNavigator from 'appData/useFpNavigator';
import useStepConfig from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';

import AndreInntektskilderFieldArray, { FormValues } from './components/AndreInntektskilderFieldArray';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

const AndreInntektskilderSteg: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
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
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <AndreInntektskilderFieldArray />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default AndreInntektskilderSteg;
