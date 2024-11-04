import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { RouteParams, SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AvtaltFerieDto } from 'types/AvtaltFerie';
import { getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import { getNesteTilretteleggingId, getTypeArbeidForTilrettelegging } from 'utils/tilretteleggingUtils';

import { BodyShort, HStack, Heading, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    ErrorSummaryHookForm,
    RhfDateRangepicker,
    RhfForm,
    RhfRadioGroup,
    RhfTextField,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import {
    hasMaxValue,
    hasMinValue,
    isAfterOrSame,
    isBeforeOrSame,
    isRequired,
    isValidDate,
    isValidNumberForm,
    notEmpty,
} from '@navikt/fp-validation';

import './feriesteg.css';

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
    feriePerioder: Array<Partial<AvtaltFerieDto>>;
    antallFeriePerioder: number;
};

const MAKS_ANTALL_PERIODER = 20;

export function FerieSteg({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) {
    const intl = useIntl();
    const params = useParams<RouteParams>();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const arbeidsgiverId = notEmpty(params.tilretteleggingId);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const oppdaterFerie = useContextSaveData(ContextDataType.FERIE);
    const ferie = useContextGetData(ContextDataType.FERIE);
    const eksisterendeSkjemaVerdier = ferie?.[arbeidsgiverId];

    const formMethods = useForm<FerieFormData>({
        mode: 'onSubmit',
        defaultValues: eksisterendeSkjemaVerdier || DEFAULT_FERIE_VALUES,
    });

    const onSubmit = (values: FerieFormData) => {
        const feriePerioderFraSubmit = values.skalHaFerie ? (values.feriePerioder as AvtaltFerieDto[]) : [];
        const nyeAvtaltFeriePerioder = feriePerioderFraSubmit.map((feriePeriode) => ({
            ...feriePeriode,
            arbeidsforhold: {
                id: arbeidsgiverId,
                type: getTypeArbeidForTilrettelegging(arbeidsgiverId, arbeidsforhold),
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
        oppdaterFerie(nyeFerieVerdier);

        const nesteTilretteleggingId = getNesteTilretteleggingId(arbeidsgiverId, valgteArbeidsforhold);

        return navigator.goToStep(
            nesteTilretteleggingId
                ? addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, nesteTilretteleggingId)
                : SøknadRoute.OPPSUMMERING,
        );
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
            onStepChange={navigator.goToStep}
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
    const params = useParams<RouteParams>();
    const arbeidsgiverId = notEmpty(params.tilretteleggingId);
    const tilrettelegginer = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const startDatoSvp = tilrettelegginer[arbeidsgiverId].behovForTilretteleggingFom;

    const { watch, setValue } = useFormContext();
    const antallFeriePerioder = watch('antallFeriePerioder');
    const feriePerioder = watch('feriePerioder');
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);

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
                            <RhfDateRangepicker
                                labelFrom={<FormattedMessage id="ferie.periode.førsteDag" />}
                                labelTo={<FormattedMessage id="ferie.periode.sisteDag" />}
                                nameFrom={`feriePerioder.${index}.fom`}
                                nameTo={`feriePerioder.${index}.tom`}
                                maxDate={dayjs(sisteDagForSvangerskapspenger)}
                                minDate={dayjs(startDatoSvp)}
                                validateFrom={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.obligatorisk',
                                        }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.gyldig',
                                        }),
                                    ),
                                    isBeforeOrSame(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.førTilDato',
                                        }),
                                        watch(`feriePerioder.${index}.tom`),
                                    ),
                                    isBeforeOrSame(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.førSisteFraværsDag',
                                        }),
                                        sisteDagForSvangerskapspenger,
                                    ),
                                    isAfterOrSame(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.etterFørsteFraværsDag',
                                        }),
                                        startDatoSvp,
                                    ),
                                ]}
                                validateTo={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.obligatorisk',
                                        }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.gyldig',
                                        }),
                                    ),
                                    isBeforeOrSame(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.førSisteFraværsDag',
                                        }),
                                        sisteDagForSvangerskapspenger,
                                    ),
                                    isAfterOrSame(
                                        intl.formatMessage({
                                            id: 'ferie.antallPerioder.validering.dato.etterFørsteFraværsDag',
                                        }),
                                        startDatoSvp,
                                    ),
                                ]}
                            />
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
