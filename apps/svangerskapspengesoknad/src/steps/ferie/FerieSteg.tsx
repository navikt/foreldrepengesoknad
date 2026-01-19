import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { RouteParams, SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import { getNesteTilretteleggingId, getTypeArbeidForTilrettelegging } from 'utils/tilretteleggingUtils';

import { BodyShort, Button, HStack, Radio, ReadMore, Tag, VStack } from '@navikt/ds-react';

import {
    ErrorSummaryHookForm,
    RhfDateRangepicker,
    RhfForm,
    RhfRadioGroup,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { AvtaltFerieDto, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { HorizontalLine, SkjemaRotLayout, Step } from '@navikt/fp-ui';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isValidDate,
    notEmpty,
} from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

const DEFAULT_FERIE_VALUES = {
    skalHaFerie: undefined,
    feriePerioder: [{ fom: undefined, tom: undefined }],
};

type FerieFormData = {
    skalHaFerie?: boolean;
    feriePerioder: Array<Partial<AvtaltFerieDto>>;
};

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
            } as const,
        }));
        const nyeFerieVerdier = {
            ...ferie,
            [arbeidsgiverId]: {
                skalHaFerie: values.skalHaFerie,
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

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        <VStack gap="space-16">
                            <RhfRadioGroup
                                name="skalHaFerie"
                                control={formMethods.control}
                                onChange={(checked) => {
                                    if (checked) {
                                        formMethods.setValue('feriePerioder', DEFAULT_FERIE_VALUES.feriePerioder);
                                    } else {
                                        formMethods.setValue('feriePerioder', []);
                                    }
                                }}
                                label={intl.formatMessage({ id: 'ferie.harDuPlanlagtFerie.label' })}
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'ferie.harDuPlanlagtFerie.validering' })),
                                ]}
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
                        <FeriePerioder />
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
}

function FeriePerioder() {
    const intl = useIntl();
    const params = useParams<RouteParams>();
    const arbeidsgiverId = notEmpty(params.tilretteleggingId);
    const tilrettelegginer = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const startDatoSvp = tilrettelegginer[arbeidsgiverId]!.behovForTilretteleggingFom;

    const { watch } = useFormContext<FerieFormData>();
    const skalHaFerie = watch('skalHaFerie');
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);

    const { fields, append, remove } = useFieldArray({
        name: 'feriePerioder',
    });

    if (!skalHaFerie) {
        return null;
    }

    return (
        <VStack gap="space-16">
            <VStack gap="space-24">
                {fields.map((field, index) => (
                    <VStack gap="space-16" key={field.id} className="feriePeriode">
                        <HStack justify="space-between" align="center">
                            <Tag data-color="info" variant="moderate">
                                <FormattedMessage id="ferie.heading" />
                            </Tag>
                            {index > 0 && (
                                <Button
                                    onClick={() => remove(index)}
                                    size="small"
                                    variant="tertiary"
                                    type="button"
                                    aria-label={`Fjern ${index + 1}. periode`}
                                    icon={<XMarkIcon />}
                                >
                                    <FormattedMessage id="ferie.periode.slett" />
                                </Button>
                            )}
                        </HStack>
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
                                isPeriodNotOverlappingOthers(
                                    intl.formatMessage(
                                        {
                                            id: 'ferie.antallPerioder.validering.dato.overlapp',
                                        },
                                        { periode: index },
                                    ),
                                    { date: watch(`feriePerioder.${index}.tom`)!, isStartDate: false },
                                    // NOTE: tillater å caste til AvtaltFerieDto ettersom required allerede er validert
                                    [(watch('feriePerioder')[index - 1] as AvtaltFerieDto) ?? []].flat(),
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
                        {index < fields.length - 1 && <HorizontalLine />}
                    </VStack>
                ))}
            </VStack>
            <Button
                onClick={() => append({ fom: undefined, tom: undefined })}
                size="small"
                className="mt-[var(--ax-space-16)] w-fit"
                type="button"
                variant="secondary"
                icon={<PlusIcon />}
            >
                <FormattedMessage id="ferie.periode.leggTil" />
            </Button>
            <ReadMore header={intl.formatMessage({ id: 'ferie.antallPerioder.readmore.label' })}>
                <BodyShort>
                    <FormattedMessage id="ferie.antallPerioder.readmore.body" />
                </BodyShort>
            </ReadMore>
        </VStack>
    );
}
