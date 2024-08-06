import { useForm } from 'react-hook-form';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';

import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

export function FerieStep({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const formMethods = useForm();

    return (
        <Step
            bannerTitle="hei"
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={() => {}}>
                <div>hai</div>
                <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
            </Form>
        </Step>
    );
}
