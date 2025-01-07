import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

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
import { AppName } from '@navikt/fp-types';
import { EgenNæring, Næringstype } from '@navikt/fp-types';
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
    egenNæring?: EgenNæring;
    saveOnNext: (formValues: EgenNæring) => void;
    saveOnPrevious: (formValues: EgenNæring | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    appOrigin: AppName;
}

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

    const formMethods = useForm<EgenNæring>({
        shouldUnregister: true,
        defaultValues: egenNæring,
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
        næringsType === Næringstype.FISKER
            ? `${navnPåNæringSpm} ${intl.formatMessage({ id: 'valgfritt' })}`
            : navnPåNæringSpm;

    const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(næringFom);

    return (
        <Step
            onCancel={cancelApplication}
            steps={stepConfig}
            onContinueLater={onContinueLater}
            onStepChange={onStepChange}
            someFieldsOptional
        >
            <RhfForm formMethods={formMethods} onSubmit={saveOnNext}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RhfRadioGroup
                        name="næringstype"
                        label={intl.formatMessage({ id: 'egenNæring.næringstype' })}
                        validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringType.påkrevd' }))]}
                    >
                        <Radio value={Næringstype.DAGMAMMA}>
                            <FormattedMessage id="egenNæring.næringstype.dagmamma" />
                        </Radio>
                        <Radio value={Næringstype.FISKER}>
                            <FormattedMessage id="egenNæring.næringstype.fiske" />
                        </Radio>
                        <Radio value={Næringstype.JORDBRUK}>
                            <FormattedMessage id="egenNæring.næringstype.jordbrukSkogbruk" />
                        </Radio>
                        <Radio value={Næringstype.ANNET}>
                            <FormattedMessage id="egenNæring.næringstype.annen" />
                        </Radio>
                    </RhfRadioGroup>
                    <RhfTextField
                        name="navnPåNæringen"
                        label={navnPåNæringLabel}
                        validate={[
                            validateEgenNæringNavn(intl, næringsType === Næringstype.FISKER),
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
                        orgNummerErValgfritt={næringsType === Næringstype.FISKER}
                        registrertINorge={registrertINorge}
                    />
                    <RhfDatepicker
                        name="fom"
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
                    <StepButtonsHookForm<EgenNæring>
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={saveOnPrevious}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
