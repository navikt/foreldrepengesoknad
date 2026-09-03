import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, Label, List, Radio, ReadMore, VStack, omit } from '@navikt/ds-react';

import { DATE_4_YEARS_AGO, DATE_5_MONTHS_AGO, DATE_20_YEARS_AGO, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    ErrorSummaryHookForm,
    RhfDatepicker,
    RhfForm,
    RhfRadioGroup,
    RhfTextField,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName, NæringDto, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';
import { ProgressStep, Step } from '@navikt/fp-ui';
import { femMånederSiden } from '@navikt/fp-utils';
import {
    hasLegalChars,
    hasMaxLength,
    hasMinValue,
    isAfterOrSame,
    isBeforeOrSame,
    isBeforeTodayOrToday,
    isRequired,
    isValidDateString as isStringAValidDate,
    isValidDate,
    isValidInteger,
} from '@navikt/fp-validation';

import { OrgnummerEllerLand } from './components/OrgnummerEllerLand';
import { VarigEndringSpørsmål } from './components/VarigEndringSpørsmål';
import { NæringFormValues } from './types/NæringFormValues';

dayjs.extend(minMax);

const hasValue = (v: string | undefined | null) => v !== '' && v !== undefined && v !== null;
const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: string) => {
    let min = otherMinDate;
    if (fom && hasValue(fom)) {
        const minDayjs = dayjs.max([dayjs(otherMinDate), dayjs(fom)]);
        min = minDayjs ? minDayjs.format(ISO_DATE_FORMAT) : otherMinDate;
    }
    return min;
};

const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: string | undefined): boolean => {
    if (!isStringAValidDate(oppstartsdato)) {
        return true;
    }
    return !oppstartsdato || dayjs(oppstartsdato).startOf('day').isAfter(DATE_4_YEARS_AGO, 'day');
};

const validateEgenNæringNavn = (intl: IntlShape, erValgfri: boolean) => (value: string | undefined) => {
    if (!erValgfri && !value) {
        return intl.formatMessage({ id: 'valideringsfeil.egenNæringNavn.påkrevd' });
    }
    if (value && value.length > 100) {
        return intl.formatMessage({ id: 'valideringsfeil.egenNæringNavn.forLang' });
    }

    return null;
};

interface Props<TYPE> {
    egenNæring?: NæringDto;
    initialNæringstype?: NæringDto['næringstype'];
    registrertNæring?: SelvstendigNæringDto_fpoversikt;
    registrerteNæringer?: SelvstendigNæringDto_fpoversikt[];
    saveOnNext: (formValues: NæringDto) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    appOrigin: AppName;
}

interface EgenNæringFormProps {
    egenNæring?: NæringDto;
    initialNæringstype?: NæringDto['næringstype'];
    registrertNæring?: SelvstendigNæringDto_fpoversikt;
    registrerteNæringer?: SelvstendigNæringDto_fpoversikt[];
    fixedNæringstype?: NæringDto['næringstype'];
    fixedRegistrertINorge?: boolean;
    onSubmit: (formValues: NæringDto) => void;
    appOrigin: AppName;
    children?: ReactNode;
    renderActions?: (submitForm: () => Promise<void>) => ReactNode;
    withoutFormElement?: boolean;
}

export const EGEN_NÆRING_ID = 'naering';

export const EgenNæringForm = ({
    egenNæring,
    initialNæringstype,
    registrertNæring,
    registrerteNæringer = [],
    fixedNæringstype,
    fixedRegistrertINorge,
    onSubmit,
    appOrigin,
    children,
    renderActions,
    withoutFormElement = false,
}: EgenNæringFormProps) => {
    const intl = useIntl();

    /**
     * Poenget her er at når egenNæring ikke er oppgit har man et helt blankt skjema. Da vil vi "pågående" skal være undefined for å tvinge et valg.
     * Hvis egenNæring finnes har bruker gjort et valg, og da vil vi velge false/true for radioknappen
     */
    const egenNæringDefaultValue = egenNæring === undefined ? undefined : !egenNæring.tom;
    const næringstype =
        fixedNæringstype ?? registrertNæring?.næringstype ?? egenNæring?.næringstype ?? initialNæringstype;
    const skjultNæringstype =
        fixedNæringstype ?? registrertNæring?.næringstype ?? (næringstype === 'FISKE' ? 'FISKE' : undefined);
    const registrertINorgeDefault = registrertNæring ? true : (fixedRegistrertINorge ?? egenNæring?.registrertINorge);

    const formMethods = useForm<NæringFormValues>({
        shouldUnregister: true,
        defaultValues: {
            ...egenNæring,
            næringstype,
            navnPåNæringen: registrertNæring?.navn ?? egenNæring?.navnPåNæringen,
            organisasjonsnummer: registrertNæring?.organisasjonsnummer ?? egenNæring?.organisasjonsnummer,
            registrertINorge: registrertINorgeDefault,
            pågående: egenNæringDefaultValue,
        },
    });

    const navnPåNæringSpm = intl.formatMessage({ id: 'egenNæring.navnPåNæring' });

    const næringsType = formMethods.watch('næringstype');
    const navnPåNæring = formMethods.watch('navnPåNæringen');
    const næringFom = formMethods.watch('fom');
    const næringTom = formMethods.watch('tom');
    const registrertINorge = formMethods.watch('registrertINorge');
    const pågående = formMethods.watch('pågående');
    const varigEndring = formMethods.watch('hattVarigEndringAvNæringsinntektSiste4Kalenderår');
    const yrkesaktivSiste3År = formMethods.watch('harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene');

    const navnPåNæringLabel =
        næringsType === 'FISKE' ? `${navnPåNæringSpm} ${intl.formatMessage({ id: 'valgfritt' })}` : navnPåNæringSpm;

    const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(næringFom);

    const handleSubmit = (values: NæringFormValues) => {
        const valuesUtenPågående = omit(values, ['pågående']);
        onSubmit(valuesUtenPågående);
    };

    const formContent = (
        <VStack gap="space-40">
            <ErrorSummaryHookForm />
            {registrertNæring && (
                <VStack gap="space-8">
                    <Label as="p">
                        <FormattedMessage id="egenNæring.registrertNæring.tittel" />
                    </Label>
                    {registrertNæring.navn && <BodyShort>{registrertNæring.navn}</BodyShort>}
                    <BodyShort>
                        <FormattedMessage
                            id="egenNæring.registrertNæring.orgnr"
                            values={{ organisasjonsnummer: registrertNæring.organisasjonsnummer }}
                        />
                    </BodyShort>
                    {registrerteNæringer.length > 1 && (
                        <>
                            <ReadMore
                                variant="moderate"
                                header={<FormattedMessage id="egenNæring.registrertNæring.flere.liste" />}
                            >
                                <List>
                                    {registrerteNæringer.map((næring) => (
                                        <List.Item key={næring.organisasjonsnummer}>
                                            {næring.navn ?? næring.organisasjonsnummer}
                                            {næring.navn && ` (${næring.organisasjonsnummer})`}
                                        </List.Item>
                                    ))}
                                </List>
                            </ReadMore>
                            <Alert variant="info">
                                <FormattedMessage
                                    id="egenNæring.registrertNæring.flere"
                                    values={{ organisasjonsnummer: registrertNæring.organisasjonsnummer }}
                                />
                            </Alert>
                        </>
                    )}
                </VStack>
            )}
            {skjultNæringstype ? (
                <input type="hidden" {...formMethods.register('næringstype')} />
            ) : (
                <RhfRadioGroup
                    name="næringstype"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: 'egenNæring.næringstype' })}
                    validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringType.påkrevd' }))]}
                >
                    <Radio value="DAGMAMMA">
                        <FormattedMessage id="egenNæring.næringstype.dagmamma" />
                    </Radio>
                    <Radio value="JORDBRUK_SKOGBRUK">
                        <FormattedMessage id="egenNæring.næringstype.jordbrukSkogbruk" />
                    </Radio>
                    <Radio value="ANNEN">
                        <FormattedMessage id="egenNæring.næringstype.annen" />
                    </Radio>
                </RhfRadioGroup>
            )}
            {registrertNæring ? (
                <input type="hidden" {...formMethods.register('navnPåNæringen')} />
            ) : (
                <RhfTextField
                    name="navnPåNæringen"
                    control={formMethods.control}
                    label={navnPåNæringLabel}
                    validate={[
                        validateEgenNæringNavn(intl, næringsType === 'FISKE'),
                        hasLegalChars((ugyldigeTegn: string) =>
                            intl.formatMessage(
                                { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
                                {
                                    feltNavn: navnPåNæringLabel,
                                    ugyldigeTegn: ugyldigeTegn,
                                },
                            ),
                        ),
                        hasMaxLength(
                            intl.formatMessage(
                                { id: 'valideringsfeil.navnPåNæringen.forLang' },
                                {
                                    feltNavn: navnPåNæringLabel,
                                },
                            ),
                            100,
                        ),
                    ]}
                    shouldReplaceInvisibleChars
                />
            )}
            {fixedRegistrertINorge !== undefined || registrertNæring ? (
                <input
                    type="hidden"
                    value={String(registrertINorgeDefault)}
                    {...formMethods.register('registrertINorge', {
                        setValueAs: (value) => value === true || value === 'true',
                    })}
                />
            ) : (
                <RhfRadioGroup
                    name="registrertINorge"
                    control={formMethods.control}
                    label={intl.formatMessage(
                        { id: 'egenNæring.erNæringenRegistrertINorge' },
                        {
                            navnPåNæringen: navnPåNæring,
                        },
                    )}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringRegistrertINorge.påkrevd' })),
                    ]}
                >
                    <Radio value={true}>
                        <FormattedMessage id="ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="nei" />
                    </Radio>
                </RhfRadioGroup>
            )}
            {registrertNæring ? (
                <input type="hidden" {...formMethods.register('organisasjonsnummer')} />
            ) : (
                <OrgnummerEllerLand
                    orgNummerErValgfritt={næringsType === 'FISKE'}
                    registrertINorge={registrertINorge}
                />
            )}
            <RhfDatepicker
                name="fom"
                control={formMethods.control}
                label={intl.formatMessage(
                    { id: 'egenNæring.næring.fom' },
                    {
                        navnPåNæringen: navnPåNæring,
                    },
                )}
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' })),
                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' })),
                    isBeforeTodayOrToday(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' })),
                    isBeforeOrSame(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' }), næringTom),
                ]}
                maxDate={dayjs()}
                minDate={DATE_20_YEARS_AGO}
                showMonthAndYearDropdowns
            />

            <RhfRadioGroup
                name="pågående"
                control={formMethods.control}
                label={intl.formatMessage(
                    { id: 'egenNæring.næring.pågående' },
                    {
                        navnPåNæringen: navnPåNæring,
                    },
                )}
                validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringPågående.påkrevd' }))]}
            >
                <Radio value={true}>
                    <FormattedMessage id="ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="nei" />
                </Radio>
            </RhfRadioGroup>

            {pågående === false && (
                <RhfDatepicker
                    name="tom"
                    control={formMethods.control}
                    label={intl.formatMessage(
                        { id: 'egenNæring.næring.tom' },
                        {
                            navnPåNæringen: navnPåNæring,
                        },
                    )}
                    description={
                        appOrigin === 'svangerskapspengesoknad'
                            ? intl.formatMessage({ id: 'egenNæring.næring.tom.description' })
                            : undefined
                    }
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' })),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.erIFremtiden' }),
                            dayjs().add(9, 'month'),
                        ),
                        isAfterOrSame(
                            intl.formatMessage({
                                id: 'valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden',
                            }),
                            femMånederSiden(),
                        ),
                        isAfterOrSame(
                            intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.etterFraDato' }),
                            næringFom,
                        ),
                    ]}
                    maxDate={dayjs().add(9, 'month')}
                    minDate={getMinInputTilOgMedValue(næringFom, DATE_5_MONTHS_AGO)}
                    showMonthAndYearDropdowns
                />
            )}
            {!erNyoppstartet && (
                <VarigEndringSpørsmål
                    varigEndring={varigEndring}
                    egenNæringFom={næringFom}
                    egenNæringTom={næringTom}
                    appOrigin={appOrigin}
                />
            )}
            {erNyoppstartet && (
                <>
                    <RhfTextField
                        name="næringsinntekt"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'egenNæring.næringsinntekt' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringInntekt.påkrevd' })),
                            isValidInteger(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.ugyldigFormat' })),
                            hasMaxLength(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.forLang' }), 9),
                            hasMinValue(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.mindreEnnNull' }), 0),
                        ]}
                    />
                    <ReadMore
                        onOpenChange={(open) =>
                            loggUmamiEvent({
                                origin: appOrigin,
                                eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                eventData: { tittel: 'egenNæring.næringsinntekt.info.apneLabel' },
                            })
                        }
                        header={intl.formatMessage({ id: 'egenNæring.næringsinntekt.info.apneLabel' })}
                    >
                        <VStack gap="space-24">
                            <BodyShort>
                                <FormattedMessage id="egenNæring.næringsinntekt.info.del1" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="egenNæring.næringsinntekt.info.del2" />
                            </BodyShort>
                        </VStack>
                    </ReadMore>
                    <RhfRadioGroup
                        name="harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'egenNæring.blittYrkesaktivSiste3År' })}
                        description={
                            <ReadMore
                                header={intl.formatMessage({ id: 'egenNæring.blittYrkesaktivSiste3År.info.tittel' })}
                            >
                                <VStack gap="space-24">
                                    <BodyShort>
                                        <FormattedMessage id="egenNæring.blittYrkesaktivSiste3År.info.del1" />
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage id="egenNæring.blittYrkesaktivSiste3År.info.del2" />
                                    </BodyShort>
                                </VStack>
                            </ReadMore>
                        }
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="nei" />
                        </Radio>
                    </RhfRadioGroup>
                    {yrkesaktivSiste3År === true && (
                        <RhfDatepicker
                            name="oppstartsdato"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'egenNæring.yrkesaktivDato' })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.yrkesaktiv.påkrevd' })),
                                isValidDate(intl.formatMessage({ id: 'valideringsfeil.yrkesaktiv.gyldigDato' })),
                                isBeforeTodayOrToday(
                                    intl.formatMessage({ id: 'valideringsfeil.yrkesaktiv.erIFremtiden' }),
                                ),
                            ]}
                            maxDate={dayjs()}
                        />
                    )}
                </>
            )}
            <Alert variant="info">{intl.formatMessage({ id: 'egenNæring.veileder' })}</Alert>
            {children}
            {renderActions?.(() => formMethods.handleSubmit(handleSubmit)())}
        </VStack>
    );

    if (withoutFormElement) {
        return <FormProvider {...formMethods}>{formContent}</FormProvider>;
    }

    return (
        <RhfForm formMethods={formMethods} onSubmit={handleSubmit}>
            {formContent}
        </RhfForm>
    );
};

export const EgenNæringPanel = <TYPE extends string>({
    egenNæring,
    initialNæringstype,
    registrertNæring,
    registrerteNæringer,
    saveOnNext,
    onAvsluttOgSlett,
    onFortsettSenere,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    appOrigin,
}: Props<TYPE>) => (
    <Step steps={stepConfig} onStepChange={onStepChange} someFieldsOptional>
        <EgenNæringForm
            egenNæring={egenNæring}
            initialNæringstype={initialNæringstype}
            registrertNæring={registrertNæring}
            registrerteNæringer={registrerteNæringer}
            fixedRegistrertINorge
            onSubmit={saveOnNext}
            appOrigin={appOrigin}
        >
            <StepButtonsHookForm<NæringFormValues>
                onAvsluttOgSlett={onAvsluttOgSlett}
                onFortsettSenere={onFortsettSenere}
                goToPreviousStep={goToPreviousStep}
            />
        </EgenNæringForm>
    </Step>
);
