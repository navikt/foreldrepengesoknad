import { useEffect } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    Datepicker,
    ErrorSummaryHookForm,
    Form,
    RadioGroup,
    StepButtonsHookForm,
    TextField,
} from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { hasMaxValue, hasMinValue, isRequired, isValidNumberForm } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { TidsperiodeDTO } from 'app/types/TidsperiodeDTO';

import './feriestep.css';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const DEFAULT_FERIE_VALUES = {
    skalHaFerie: undefined,
    feriePerioder: [{ fom: undefined, tom: undefined }],
    antallFeriePerioder: 1,
};

type FerieFormData = {
    skalHaFerie?: boolean;
    feriePerioder: Array<Partial<TidsperiodeDTO>>;
    antallFeriePerioder: number;
};

const MAKS_ANTALL_PERIODER = 50;

export function FerieStep({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const oppdaterFerie = useContextSaveData(ContextDataType.FERIE);
    const e = useContextGetData(ContextDataType.FERIE);
    console.log(e);
    const formMethods = useForm<FerieFormData>({
        mode: 'onSubmit',
        defaultValues: e
            ? { skalHaFerie: e.length > 0, feriePerioder: e, antallFeriePerioder: e.length }
            : DEFAULT_FERIE_VALUES,
    });

    const onSubmit = (values: FerieFormData) => {
        oppdaterFerie(values.feriePerioder); //TODO
        return navigator.goToNextDefaultStep();
    };

    return (
        <Step
            bannerTitle="hei"
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
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
    const { watch, setValue } = useFormContext();
    const antallFeriePerioder = watch('antallFeriePerioder');

    useEffect(() => {
        if (antallFeriePerioder > 0 && antallFeriePerioder < MAKS_ANTALL_PERIODER) {
            setValue('feriePerioder', Array.from(Array(Number(antallFeriePerioder))));
        }
    }, [antallFeriePerioder]);

    const { fields } = useFieldArray({
        name: 'feriePerioder',
    });

    return (
        <VStack gap="4">
            <TextField
                name="antallFeriePerioder"
                label="Hvor mange perioder med ferie skal du ha?"
                htmlSize={2}
                validate={[
                    isRequired('bo'),
                    isValidNumberForm('tall'),
                    hasMinValue('minst 1', 1),
                    hasMaxValue(`maks ${MAKS_ANTALL_PERIODER}`, MAKS_ANTALL_PERIODER),
                ]}
            />
            <ReadMore header="Hvordan man regner antall ferieperioder">
                <BodyShort>
                    En sammenhengende periode med feriedager og helger uten arbeidsdager regnes som én ferieperiode.
                    Hvis det er en arbeidsdag mellom to ferieperioder, regnes de som to separate perioder.
                </BodyShort>
            </ReadMore>
            <VStack gap="10">
                {fields.map((_, index) => (
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
