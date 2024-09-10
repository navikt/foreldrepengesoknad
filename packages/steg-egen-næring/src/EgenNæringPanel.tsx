import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { DATE_4_YEARS_AGO, DATE_5_MONTHS_AGO, DATE_20_YEARS_AGO } from '@navikt/fp-constants';
import {
    Datepicker,
    ErrorSummaryHookForm,
    Form,
    RadioGroup,
    StepButtonsHookForm,
    TextField,
} from '@navikt/fp-form-hooks';
import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
import { AppName } from '@navikt/fp-types';
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
    isValidNumberForm,
} from '@navikt/fp-validation';

import OrgnummerEllerLand from './components/OrgnummerEllerLand';
import VarigEndringSpørsmål from './components/VarigEndringSpørsmål';
import { EgenNæring, Næringstype } from './types/egenNæring';

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
    stønadstype: AppName;
}

const EgenNæringPanel = <TYPE extends string>({
    egenNæring,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    stønadstype,
}: Props<TYPE>) => {
    const intl = useIntl();

    const formMethods = useForm<EgenNæring>({
        shouldUnregister: true,
        defaultValues: egenNæring,
    });

    const navnPåNæringSpm = intl.formatMessage({ id: 'egenNæring.navnPåNæring' });

    const næringsType = formMethods.watch('næringstype');
    const navnPåNæring = formMethods.watch('navnPåNæringen');
    const næringFom = formMethods.watch('fomDato');
    const næringTom = formMethods.watch('tomDato');
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
        >
            <Form formMethods={formMethods} onSubmit={saveOnNext}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <BodyShort>
                        <FormattedMessage id="harValgfrieFelt" />
                    </BodyShort>
                    <RadioGroup
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
                    </RadioGroup>
                    <TextField
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
                    <RadioGroup
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
                    </RadioGroup>
                    <OrgnummerEllerLand
                        orgNummerErValgfritt={næringsType === Næringstype.FISKER}
                        registrertINorge={registrertINorge}
                    />
                    <Datepicker
                        name="fomDato"
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

                    <RadioGroup
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
                    </RadioGroup>

                    {pågående === false && (
                        <Datepicker
                            name="tomDato"
                            label={intl.formatMessage(
                                { id: 'egenNæring.næring.tom' },
                                {
                                    navnPåNæringen: navnPåNæring,
                                },
                            )}
                            description={
                                stønadstype === 'Svangerskapspenger'
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
                            stønadstype={stønadstype}
                        />
                    )}
                    {erNyoppstartet && (
                        <>
                            <TextField
                                name="næringsinntekt"
                                label={intl.formatMessage({ id: 'egenNæring.næringsinntekt' })}
                                description={intl.formatMessage({ id: 'egenNæring.næringsinntekt.description' })}
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringInntekt.påkrevd' })),
                                    hasMaxLength(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.forLang' }),
                                        9,
                                    ),
                                    isValidNumberForm(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.ugyldigFormat' }),
                                    ),
                                    hasMinValue(
                                        intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.mindreEnnNull' }),
                                        0,
                                    ),
                                ]}
                            />
                            <ReadMore
                                onOpenChange={logAmplitudeEventOnOpen(stønadstype, 'Mer_om_næringsresultat')}
                                header={intl.formatMessage({ id: 'egenNæring.næringsinntekt.info.apneLabel' })}
                            >
                                <BodyShort>
                                    <FormattedMessage id="egenNæring.næringsinntekt.info" />
                                </BodyShort>
                            </ReadMore>
                            <RadioGroup
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
                            </RadioGroup>
                            {yrkesaktivSiste3År === true && (
                                <Datepicker
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
            </Form>
        </Step>
    );
};

export default EgenNæringPanel;
