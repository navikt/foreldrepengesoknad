import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useController, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyShort, DatePicker, HStack, Heading, Radio, ReadMore, VStack, useRangeDatepicker } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
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
    const eksisterendeSkjemaVerdier = useContextGetData(ContextDataType.FERIE);
    console.log('Eksisterende verdier', eksisterendeSkjemaVerdier);
    const formMethods = useForm<FerieFormData>({
        mode: 'onSubmit',
        defaultValues: eksisterendeSkjemaVerdier
            ? {
                  skalHaFerie: eksisterendeSkjemaVerdier.length > 0,
                  feriePerioder: eksisterendeSkjemaVerdier,
                  antallFeriePerioder: eksisterendeSkjemaVerdier.length,
              }
            : DEFAULT_FERIE_VALUES,
    });
    console.log('Verdier i formet', formMethods.watch());

    const onSubmit = (values: FerieFormData) => {
        console.log('setter dusse verdiene', values);
        values.skalHaFerie ? oppdaterFerie(values.feriePerioder) : oppdaterFerie([]);
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
    const feriePerioder = watch('feriePerioder');

    useEffect(() => {
        if (antallFeriePerioder > 0 && antallFeriePerioder < MAKS_ANTALL_PERIODER) {
            if (antallFeriePerioder !== feriePerioder.length) {
                const forrigeLengde = feriePerioder.length;
                feriePerioder.length = antallFeriePerioder;
                feriePerioder.fill(undefined, forrigeLengde, antallFeriePerioder);
                setValue('feriePerioder', feriePerioder);
            }
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
                    isRequired('Oppgi'),
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
                {fields.map((field, index) => (
                    <VStack gap="4" key={field.id} className="feriePeriode">
                        <Heading level="3" size="small">
                            {index + 1}. periode
                        </Heading>
                        <HStack>
                            <IndentDivider />
                            <RangeDatePicker name={`feriePerioder.${index}`} />
                        </HStack>
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );
}

// TODO: vurder å lag generell komponent
function RangeDatePicker({ name }: { name: string }) {
    const {
        field: fromField,
        fieldState: { error: fromError },
    } = useController({
        name: `${name}.fom`,
        rules: {
            required: 'Må oppgis',
        },
    });

    const {
        field: toField,
        fieldState: { error: toError },
    } = useController({
        name: `${name}.tom`,
        rules: {
            required: 'Må oppgis',
        },
    });

    const defaultFom = fromField.value
        ? dayjs(fromField.value, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT)
        : '';
    const defaultTom = toField.value ? dayjs(toField.value, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT) : '';

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        defaultSelected: {
            from: fromField.value ? dayjs(fromField.value, ISO_DATE_FORMAT, true).toDate() : undefined,
            to: toField.value ? dayjs(toField.value, ISO_DATE_FORMAT, true).toDate() : undefined,
        },
        onRangeChange: (dateRange) => {
            if (dateRange) {
                const fom = dateRange.from ? dayjs(dateRange.from).format(ISO_DATE_FORMAT) : undefined;
                const tom = dateRange.to ? dayjs(dateRange.to).format(ISO_DATE_FORMAT) : undefined;

                fromField.onChange(fom);
                toField.onChange(tom);
            }
        },
    });

    return (
        <DatePicker {...datepickerProps}>
            <HStack gap="10" align="start">
                <DatePicker.Input
                    error={fromError?.message}
                    value={defaultFom}
                    ref={fromField.ref}
                    {...fromInputProps}
                    label="Første feriedag"
                />
                <DatePicker.Input
                    error={toError?.message}
                    value={defaultTom}
                    ref={toField.ref}
                    {...toInputProps}
                    label="Siste feriedag"
                />
            </HStack>
        </DatePicker>
    );
}

function IndentDivider() {
    return <div className="indent-divider"></div>;
}
