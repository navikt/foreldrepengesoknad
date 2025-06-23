import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, Radio, ReadMore, VStack, omit } from '@navikt/ds-react';

import { DATE_4_YEARS_AGO, DATE_5_MONTHS_AGO, DATE_20_YEARS_AGO } from '@navikt/fp-constants';
import {
    ErrorSummaryHookForm,
    RhfDatepicker,
    RhfForm,
    RhfRadioGroup,
    RhfTextField,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { AppName, NæringDto } from '@navikt/fp-types';
import { ProgressStep, Step } from '@navikt/fp-ui';
import { femMånederSiden, isValidDate as isStringAValidDate } from '@navikt/fp-utils';
import {
    hasLegalChars,
    hasMaxLength,
    hasMinValue,
    isAfterOrSame,
    isBeforeOrSame,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
    isValidInteger,
} from '@navikt/fp-validation';

import { OrgnummerEllerLand } from './components/OrgnummerEllerLand';
import { VarigEndringSpørsmål } from './components/VarigEndringSpørsmål';
import { NæringFormValues } from './types/NæringFormValues';

dayjs.extend(minMax);

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;
const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: Date) => {
    let min = otherMinDate;
    if (fom && hasValue(fom)) {
        const minDayjs = dayjs.max([dayjs(otherMinDate), dayjs(fom)]);
        min = minDayjs ? minDayjs.toDate() : otherMinDate;
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
    saveOnNext: (formValues: NæringDto) => void;
    saveOnPrevious: (formValues: NæringDto | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    appOrigin: AppName;
}

export const EGEN_NÆRING_ID = 'naering';

export const EgenNæringPanel = <TYPE extends string>({
    egenNæring,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    appOrigin,
}: Props<TYPE>) => {
    const intl = useIntl();

    /**
     * Poenget her er at når egenNæring ikke er oppgit har man et helt blankt skjema. Da vil vi "pågående" skal være undefined for å tvinge et valg.
     * Hvis egenNæring finnes har bruker gjort et valg, og da vil vi velge false/true for radioknappen
     */
    const egenNæringDefaultValue = egenNæring === undefined ? undefined : !egenNæring.tom;

    const formMethods = useForm<NæringFormValues>({
        shouldUnregister: true,
        defaultValues: { ...egenNæring, pågående: egenNæringDefaultValue },
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

    const onSubmit = (values: NæringFormValues) => {
        const valuesUtenPågående = omit(values, ['pågående']);
        saveOnNext(valuesUtenPågående);
    };

    return (
        <Step
            onCancel={cancelApplication}
            steps={stepConfig}
            onContinueLater={onContinueLater}
            onStepChange={onStepChange}
            someFieldsOptional
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RhfRadioGroup
                        name="næringstype"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'egenNæring.næringstype' })}
                        validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringType.påkrevd' }))]}
                    >
                        <Radio value="DAGMAMMA">
                            <FormattedMessage id="egenNæring.næringstype.dagmamma" />
                        </Radio>
                        <Radio value="FISKE">
                            <FormattedMessage id="egenNæring.næringstype.fiske" />
                        </Radio>
                        <Radio value="JORDBRUK_SKOGBRUK">
                            <FormattedMessage id="egenNæring.næringstype.jordbrukSkogbruk" />
                        </Radio>
                        <Radio value="ANNEN">
                            <FormattedMessage id="egenNæring.næringstype.annen" />
                        </Radio>
                    </RhfRadioGroup>
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
                            isRequired(
                                intl.formatMessage({ id: 'valideringsfeil.egenNæringRegistrertINorge.påkrevd' }),
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
                    <OrgnummerEllerLand
                        orgNummerErValgfritt={næringsType === 'FISKE'}
                        registrertINorge={registrertINorge}
                    />
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
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' }),
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' }),
                                næringTom,
                            ),
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
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringPågående.påkrevd' })),
                        ]}
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
                                description={intl.formatMessage({ id: 'egenNæring.næringsinntekt.description' })}
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringInntekt.påkrevd' })),
                                    isValidInteger(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.ugyldigFormat' }),
                                    ),
                                    hasMaxLength(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.forLang' }),
                                        9,
                                    ),
                                    hasMinValue(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.mindreEnnNull' }),
                                        0,
                                    ),
                                ]}
                            />
                            <ReadMore
                                onOpenChange={(open) =>
                                    loggAmplitudeEvent({
                                        origin: appOrigin,
                                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                        eventData: { tittel: 'egenNæring.næringsinntekt.info.apneLabel' },
                                    })
                                }
                                header={intl.formatMessage({ id: 'egenNæring.næringsinntekt.info.apneLabel' })}
                            >
                                <BodyShort>
                                    <FormattedMessage id="egenNæring.næringsinntekt.info" />
                                </BodyShort>
                            </ReadMore>
                            <RhfRadioGroup
                                name="harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"
                                control={formMethods.control}
                                label={intl.formatMessage({ id: 'egenNæring.blittYrkesaktivSiste3År' })}
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
                                        isValidDate(
                                            intl.formatMessage({ id: 'valideringsfeil.yrkesaktiv.gyldigDato' }),
                                        ),
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
                    <StepButtonsHookForm<NæringFormValues>
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={saveOnPrevious}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
