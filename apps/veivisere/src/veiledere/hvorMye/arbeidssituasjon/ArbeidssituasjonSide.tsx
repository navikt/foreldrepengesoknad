import useStepData from 'appData/useStepData';
import useVeilederNavigator from 'appData/useVeilederNavigator';
import VeilederPage from 'components/Page/VeilederPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Heading, Spacer, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';

export type Arbeidssituasjon = {
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
};

interface Props {
    arbeidssituasjon?: Arbeidssituasjon;
    setArbeidssituasjon: (arbeidssituasjon: Arbeidssituasjon) => void;
}

const ArbeidssituasjonSide: FunctionComponent<Props> = (arbeidssituasjon, setArbeidssituasjon) => {
    const intl = useIntl();
    const navigator = useVeilederNavigator();
    const stepConfig = useStepData();

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const onSubmit = (formValues: Arbeidssituasjon) => {
        setArbeidssituasjon(formValues);
        navigator.goToNextDefaultStep();
    };

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <VeilederPage ref={ref} label={intl.formatMessage({ id: 'Tittel' })}>
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">test</VStack>
                    <Spacer />
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={setArbeidssituasjon}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </VeilederPage>
    );
};

export default ArbeidssituasjonSide;
