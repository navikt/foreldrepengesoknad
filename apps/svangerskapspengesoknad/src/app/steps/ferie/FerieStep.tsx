import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Radio, ReadMore, TextField, VStack } from '@navikt/ds-react';

import { Datepicker, ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

import './feriestep.css';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

export function FerieStep({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const formMethods = useForm({
        defaultValues: {
            skalHaFerie: undefined,
            antallFeriePerioder: 1,
        },
    });

    return (
        <Step
            bannerTitle="hei"
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={() => {}}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <VStack gap="4">
                        <RadioGroup
                            name="skalHaFerie"
                            label="Har du planlagt ferie i perioden du skal ha svangerskapspenger?"
                            validate={[isRequired('bø')]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                        <ReadMore header="Hvordan planlagt ferie virker inn på svangerskapspengene">
                            <BodyShort>
                                Hvis du allerede har planlagt ferie i perioden du søker om svangerskapspenger for, vil
                                ferien bestå. Du vil bruke feriedagene dine og motta lønn fra arbeidsgiveren, ikke
                                svangerskapspenger.
                            </BodyShort>
                        </ReadMore>
                    </VStack>
                    {formMethods.watch('skalHaFerie') && <FeriePerioder />}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
}

function FeriePerioder() {
    const { register, watch } = useFormContext();
    const antallFeriePerioder = watch('antallFeriePerioder');
    return (
        <VStack gap="4">
            <TextField
                {...register('antallFeriePerioder')}
                label="Hvor mange perioder med ferie skal du ha?"
                htmlSize={2}
            />
            <ReadMore header="Hvordan man regner antall ferieperioder">
                <BodyShort>
                    En sammenhengende periode med feriedager og helger uten arbeidsdager regnes som én ferieperiode.
                    Hvis det er en arbeidsdag mellom to ferieperioder, regnes de som to separate perioder.
                </BodyShort>
            </ReadMore>
            <VStack gap="10">
                {Array.from(Array(Number(antallFeriePerioder))).map((_, index) => (
                    <VStack gap="4" key={index} className="feriePeriode">
                        <Heading level="3" size="small">
                            {index + 1}. periode
                        </Heading>
                        <HStack>
                            <IndentDivider />
                            <VStack gap="10">
                                <Datepicker name={`feriePerioder.${index}.fom`} label="Første feriedag" />
                                <Datepicker name={`feriePerioder.${index}.tom`} label="Siste feriedag" />
                            </VStack>
                        </HStack>
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );
}

function IndentDivider() {
    return <div className="indent-divider"></div>;
}
