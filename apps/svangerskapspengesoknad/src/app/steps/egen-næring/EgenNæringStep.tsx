import { Alert, BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';
import { Step, date20YearsAgo, date5MonthsAgo, validateTextInputField } from '@navikt/fp-common';
import {
    Datepicker,
    ErrorSummaryHookForm,
    Form,
    RadioGroup,
    StepButtonsHookForm,
    TextField,
} from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { femMånederSiden, isValidDate as isStringAValidDate } from '@navikt/fp-utils';
import {
    hasMaxLength,
    hasMinValue,
    isAfterOrSame,
    isBeforeOrSame,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
    isValidNumber,
    notEmpty,
} from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import { getBackLinkForNæringSteg, getNextRouteForNæring, useStepConfig } from 'app/steps/stepsConfig';
import { EgenNæring, Næringstype } from 'app/types/EgenNæring';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { getNæringTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import OrgnummerEllerLand from './components/OrgnummerEllerLand';
import VarigEndringSpørsmål from './components/VarigEndringSpørsmål';
import { DATE_4_YEARS_AGO } from '@navikt/fp-constants';
import { useNavigate } from 'react-router-dom';

const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: string | undefined): boolean => {
    if (!isStringAValidDate(oppstartsdato)) {
        return true;
    }
    return !oppstartsdato || dayjs(oppstartsdato).startOf('day').isAfter(DATE_4_YEARS_AGO, 'day');
};

const validateEgenNæringNavn = (intl: IntlShape, label: string, erValgfri: boolean) => (value: string | undefined) => {
    if (!erValgfri && !value) {
        return intl.formatMessage({ id: 'valideringsfeil.egenNæringNavn.påkrevd' });
    }
    if (value && value.length > 100) {
        return intl.formatMessage({ id: 'valideringsfeil.egenNæringNavn.forLang' });
    }
    return validateTextInputField(value, label, intl);
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const EgenNæringStep: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const navigate = useNavigate();

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: EgenNæring) => {
        oppdaterEgenNæring(values);

        if (
            søkerHarKunEtAktivtArbeid(
                barnet.termindato,
                arbeidsforhold,
                inntektsinformasjon.harJobbetSomFrilans,
                inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
            )
        ) {
            const automatiskValgtTilrettelegging = [getNæringTilretteleggingOption(tilrettelegginger || [], values)];
            oppdaterTilrettelegginger(automatiskValgtTilrettelegging);
        }

        const { nextRoute, nextTilretteleggingId } = getNextRouteForNæring(
            inntektsinformasjon,
            barnet.termindato,
            arbeidsforhold,
        );

        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

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

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="næring"
            pageTitle={intl.formatMessage({ id: 'steps.label.næring' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
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
                        maxLength={100}
                        validate={[validateEgenNæringNavn(intl, navnPåNæringLabel, næringsType === Næringstype.FISKER)]}
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
                        minDate={date20YearsAgo}
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
                            description={intl.formatMessage({ id: 'egenNæring.næring.tom.description' })}
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
                            minDate={getMinInputTilOgMedValue(næringFom, date5MonthsAgo)}
                        />
                    )}
                    {!erVirksomhetRegnetSomNyoppstartet(næringFom) && (
                        <VarigEndringSpørsmål
                            varigEndring={varigEndring}
                            egenNæringFom={næringFom}
                            egenNæringTom={næringTom}
                        />
                    )}
                    <TextField
                        name="næringsinntekt"
                        label={intl.formatMessage({ id: 'egenNæring.næringsinntekt' })}
                        description={intl.formatMessage({ id: 'egenNæring.næringsinntekt.description' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringInntekt.påkrevd' })),
                            hasMaxLength(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.forLang' }), 9),
                            isValidNumber(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.ugyldigFormat' })),
                            hasMinValue(intl.formatMessage({ id: 'valideringsfeil.næringsinntekt.mindreEnnNull' }), 0),
                        ]}
                    />
                    <ReadMore header={intl.formatMessage({ id: 'egenNæring.næringsinntekt.info.apneLabel' })}>
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
                    {erVirksomhetRegnetSomNyoppstartet(næringFom) && yrkesaktivSiste3År === true && (
                        <Datepicker
                            name="oppstartsdato"
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
                    <Alert variant="info">{intl.formatMessage({ id: 'egenNæring.veileder' })}</Alert>
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            const backRoute = getBackLinkForNæringSteg(inntektsinformasjon);
                            oppdaterAppRoute(backRoute);
                            navigate(backRoute);
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default EgenNæringStep;
