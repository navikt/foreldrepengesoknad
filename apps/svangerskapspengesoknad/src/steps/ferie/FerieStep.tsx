import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useController, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AvtaltFerie } from 'types/AvtaltFerie';
import Tilrettelegging from 'types/Tilrettelegging';

import { BodyShort, DatePicker, HStack, Heading, Radio, ReadMore, VStack, useRangeDatepicker } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '../../../../../packages/constants';
import {
    ErrorSummaryHookForm,
    RhfForm,
    RhfRadioGroup,
    RhfTextField,
    StepButtonsHookForm,
} from '../../../../../packages/form-hooks';
import { Arbeidsforhold } from '../../../../../packages/types';
import { Step } from '../../../../../packages/ui';
import { hasMaxValue, hasMinValue, isRequired, isValidNumberForm, notEmpty } from '../../../../../packages/validation';
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
    feriePerioder: Array<Partial<AvtaltFerie>>;
    antallFeriePerioder: number;
};

const MAKS_ANTALL_PERIODER = 50;

export function FerieStep({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const valgtTilretteleggingId = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));
    const currentTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));
    const arbeidsgiverId = currentTilrettelegging.arbeidsforhold.arbeidsgiverId ?? ''; // TODO: what to do hvis denne er undefined?

    const oppdaterFerie = useContextSaveData(ContextDataType.FERIE);
    const ferie = useContextGetData(ContextDataType.FERIE);
    console.log(ferie);
    const eksisterendeSkjemaVerdier = ferie?.[arbeidsgiverId];

    const formMethods = useForm<FerieFormData>({
        mode: 'onSubmit',
        defaultValues: eksisterendeSkjemaVerdier || DEFAULT_FERIE_VALUES,
    });

    const onSubmit = (values: FerieFormData) => {
        const feriePerioderFraSubmit = values.skalHaFerie ? (values.feriePerioder as AvtaltFerie[]) : [];
        const nyeAvtaltFeriePerioder = feriePerioderFraSubmit.map((feriePeriode) => ({
            ...feriePeriode,
            arbeidsforhold: {
                id: arbeidsgiverId,
                type: currentTilrettelegging.arbeidsforhold.type,
            },
        }));
        const nyeFerieVerdier = {
            ...ferie,
            [arbeidsgiverId]: {
                skalHaFerie: values.skalHaFerie,
                antallFeriePerioder: values.feriePerioder.length,
                feriePerioder: nyeAvtaltFeriePerioder,
            },
        };
        console.log(nyeFerieVerdier);
        oppdaterFerie(nyeFerieVerdier);

        const nesteTilretteleggingId = getNesteTilretteleggingId(tilrettelegginger, currentTilrettelegging.id);
        const nextRoute = nesteTilretteleggingId ? SøknadRoutes.SKJEMA : SøknadRoutes.OPPSUMMERING;
        if (nesteTilretteleggingId) {
            oppdaterValgtTilretteleggingId(nesteTilretteleggingId);
        }
        return navigator.goToNextStep(nextRoute);
    };

    const skalHaFerie = formMethods.watch('skalHaFerie');

    // Hvis radio-button valget endret seg vil vi endre "antallFeriePerioder" slik at fieldArray får riktige initielle verdier.
    useEffect(() => {
        if (!skalHaFerie) {
            formMethods.setValue('antallFeriePerioder', 0);
        } else {
            formMethods.setValue('antallFeriePerioder', 1);
        }
    }, [skalHaFerie]);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <VStack gap="4">
                        <RhfRadioGroup
                            name="skalHaFerie"
                            label={intl.formatMessage({ id: 'ferie.harDuPlanlagtFerie.label' })}
                            validate={[isRequired(intl.formatMessage({ id: 'ferie.harDuPlanlagtFerie.validering' }))]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RhfRadioGroup>
                        <ReadMore header={intl.formatMessage({ id: 'ferie.readmore.hvordanPlanlegge.header' })}>
                            <BodyShort>
                                <FormattedMessage id="ferie.readmore.hvordanPlanlegge.body" />
                            </BodyShort>
                        </ReadMore>
                    </VStack>
                    {skalHaFerie && <FeriePerioder />}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
}

function FeriePerioder() {
    const intl = useIntl();
    const { watch, setValue } = useFormContext();
    const antallFeriePerioder = watch('antallFeriePerioder');
    const feriePerioder = watch('feriePerioder');

    useEffect(() => {
        /*
         Hvis antall ferieperioder har forandret seg innenfor gyldige verdier
         Så enten kutt bort de som er over antall, eller utvid array med "undefined" for nye entries
        */
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
            <RhfTextField
                name="antallFeriePerioder"
                label={intl.formatMessage({ id: 'ferie.antallPerioder.label' })}
                htmlSize={2}
                validate={[
                    isRequired(intl.formatMessage({ id: 'ferie.antallPerioder.validering.obligatorisk' })),
                    isValidNumberForm(intl.formatMessage({ id: 'ferie.antallPerioder.validering.tall' })),
                    hasMinValue(intl.formatMessage({ id: 'ferie.antallPerioder.validering.minimum' }), 1),
                    hasMaxValue(
                        intl.formatMessage(
                            { id: 'ferie.antallPerioder.validering.maksimum' },
                            { maks: MAKS_ANTALL_PERIODER },
                        ),
                        MAKS_ANTALL_PERIODER,
                    ),
                ]}
            />
            <ReadMore header={intl.formatMessage({ id: 'ferie.antallPerioder.readmore.label' })}>
                <BodyShort>
                    <FormattedMessage id="ferie.antallPerioder.readmore.body" />
                </BodyShort>
            </ReadMore>
            <VStack gap="10">
                {fields.map((field, index) => (
                    <VStack gap="4" key={field.id} className="feriePeriode">
                        <Heading level="3" size="small">
                            <FormattedMessage id="ferie.periode.heading" values={{ teller: index + 1 }} />
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
                    label={<FormattedMessage id="ferie.periode.førsteDag" />}
                />
                <DatePicker.Input
                    error={toError?.message}
                    value={defaultTom}
                    ref={toField.ref}
                    {...toInputProps}
                    label={<FormattedMessage id="ferie.periode.sisteDag" />}
                />
            </HStack>
        </DatePicker>
    );
}

function IndentDivider() {
    return <div className="indent-divider"></div>;
}

const getNesteTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
): string | undefined => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};
