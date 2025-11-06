import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { RouteParams, SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
} from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverNavnForTilrettelegging,
    getArbeidsgiverStillingerForTilrettelegging,
    getNesteTilretteleggingId,
    getPeriodeForTilrettelegging,
    getTypeArbeidForTilrettelegging,
} from 'utils/tilretteleggingUtils';

import { BodyLong, BodyShort, ExpansionCard, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    ErrorSummaryHookForm,
    RhfDatepicker,
    RhfForm,
    RhfRadioGroup,
    RhfTextarea,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { loggUmamiEvent } from '@navikt/fp-metrics';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { capitalizeFirstLetterInEveryWordOnly, tiMånederSidenDato } from '@navikt/fp-utils';
import { hasLegalChars, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { Bedriftsbanner } from '../Bedriftsbanner';
import { DelvisTilretteleggingPanel } from './DelvisTilretteleggingPanel';
import { IngenTilretteleggingPanel } from './IngenTilretteleggingPanel';
import {
    validateBehovForTilretteleggingFom,
    validateRisikofaktorer,
    validateTilretteleggingstiltak,
} from './tilretteleggingValidation';

const finnRisikofaktorLabel = (intl: IntlShape, typeArbeid: Arbeidsforholdstype) =>
    typeArbeid === 'frilanser'
        ? intl.formatMessage({ id: 'skjema.risikofaktorer.frilanser' })
        : intl.formatMessage({ id: 'skjema.risikofaktorer.selvstendig' });

const getLabel = (
    erFlereTilrettelegginger: boolean,
    typeArbeid: Arbeidsforholdstype,
    intl: IntlShape,
    erFom: boolean,
    navnArbeidsgiver?: string,
) => {
    if (erFlereTilrettelegginger && typeArbeid !== 'frilanser') {
        return erFom
            ? intl.formatMessage(
                  { id: 'tilrettelegging.tilrettelagtArbeidFom.label.flere' },
                  {
                      navnArbeidsgiver: capitalizeFirstLetterInEveryWordOnly(navnArbeidsgiver),
                  },
              )
            : intl.formatMessage(
                  { id: 'tilrettelegging.tilrettelagtArbeidType.label.flere' },
                  {
                      navnArbeidsgiver: capitalizeFirstLetterInEveryWordOnly(navnArbeidsgiver),
                  },
              );
    }
    if (typeArbeid === 'frilanser') {
        return erFom
            ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidFom.label.frilanser' })
            : intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.label.frilanser' });
    }

    return erFom
        ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidFom.label.en' })
        : intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.label.en' });
};

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const TilretteleggingSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const params = useParams<RouteParams>();
    const valgtTilretteleggingId = notEmpty(params.tilretteleggingId);

    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const perioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterVariertePerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);

    const tilrettelegging = tilrettelegginger?.[valgtTilretteleggingId];

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);

    const navnArbeidsgiver = getArbeidsgiverNavnForTilrettelegging(intl, valgtTilretteleggingId, arbeidsforhold);
    const stillinger = getArbeidsgiverStillingerForTilrettelegging(
        barnet.termindato,
        valgtTilretteleggingId,
        arbeidsforhold,
        egenNæring,
        frilans,
    );

    const erFlereTilrettelegginger = !!valgteArbeidsforhold && valgteArbeidsforhold.length > 1;
    const typeArbeidsforhold = getTypeArbeidForTilrettelegging(valgtTilretteleggingId, arbeidsforhold);
    const risikofaktorerLabel = finnRisikofaktorLabel(intl, typeArbeidsforhold);

    const labelTiltak = intl.formatMessage({ id: 'tilrettelegging.tilretteleggingstiltak.label' });
    const harSkjema = typeArbeidsforhold === 'virksomhet' || typeArbeidsforhold === 'privat';

    const periode = getPeriodeForTilrettelegging(
        barnet.termindato,
        valgtTilretteleggingId,
        arbeidsforhold,
        egenNæring,
        frilans,
    );
    const minDatoBehovFom = dayjs.max(dayjs(tiMånederSidenDato(barnet.termindato)), dayjs(periode.fom));
    const maxDatoBehovFom = periode.tom
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(periode.tom))!.toDate()
        : sisteDagForSvangerskapspenger;

    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const onSubmit = (values: DelvisTilrettelegging | IngenTilrettelegging) => {
        oppdaterTilrettelegginger({ ...tilrettelegginger, [valgtTilretteleggingId]: values });

        const typeArbeidsgiver = getTypeArbeidForTilrettelegging(valgtTilretteleggingId, arbeidsforhold);
        if (
            values.type === 'delvis' &&
            values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
        ) {
            return navigator.goToStep(addTilretteleggingIdToRoute(SøknadRoute.PERIODER, valgtTilretteleggingId));
        }

        // Siden vi ikke skal gå videre til å oppgi varierte perioder for dette arbeidsforholdet må vi slette eksisterende skjemadata for varierte perioder.
        if (perioder !== undefined) {
            oppdaterVariertePerioder(omit(perioder, valgtTilretteleggingId));
        }

        // Bare virksomheter eller private skal oppgi ferie.
        if (typeArbeidsgiver === 'virksomhet' || typeArbeidsgiver === 'privat') {
            return navigator.goToStep(addTilretteleggingIdToRoute(SøknadRoute.FERIE, valgtTilretteleggingId));
        }

        const nesteTilretteleggingId = getNesteTilretteleggingId(valgtTilretteleggingId, valgteArbeidsforhold);

        return navigator.goToStep(
            nesteTilretteleggingId
                ? addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, nesteTilretteleggingId)
                : SøknadRoute.OPPSUMMERING,
        );
    };

    const formMethods = useForm<DelvisTilrettelegging | IngenTilrettelegging>({
        shouldUnregister: true,
        defaultValues: tilrettelegging,
    });

    const type = formMethods.watch('type');

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {erFlereTilrettelegginger && (
                            <Bedriftsbanner
                                arbeidsforholdType={typeArbeidsforhold}
                                arbeidsforholdNavn={navnArbeidsgiver}
                            />
                        )}
                        <RhfDatepicker
                            name="behovForTilretteleggingFom"
                            control={formMethods.control}
                            label={getLabel(erFlereTilrettelegginger, typeArbeidsforhold, intl, true, navnArbeidsgiver)}
                            description={
                                harSkjema
                                    ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidFom.description' })
                                    : ''
                            }
                            minDate={minDatoBehovFom}
                            maxDate={maxDatoBehovFom}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.mangler' })),
                                isValidDate(
                                    intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.gyldigDato' }),
                                ),
                                validateBehovForTilretteleggingFom(
                                    intl,
                                    sisteDagForSvangerskapspenger,
                                    barnet.termindato,
                                    navnArbeidsgiver || '',
                                    periode.fom,
                                    periode.tom,
                                    kanHaSVPFremTilTreUkerFørTermin,
                                    typeArbeidsforhold === 'frilanser',
                                ),
                            ]}
                            defaultMonth={
                                minDatoBehovFom ? getDefaultMonth(minDatoBehovFom, maxDatoBehovFom) : undefined
                            }
                        />
                        {(typeArbeidsforhold === 'frilanser' || typeArbeidsforhold === 'selvstendig') && (
                            <>
                                <RhfTextarea
                                    name="risikofaktorer"
                                    control={formMethods.control}
                                    label={risikofaktorerLabel}
                                    validate={[
                                        validateRisikofaktorer(intl, typeArbeidsforhold),
                                        hasLegalChars((ugyldigeTegn: string) =>
                                            intl.formatMessage(
                                                { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
                                                {
                                                    feltNavn: risikofaktorerLabel,
                                                    ugyldigeTegn: ugyldigeTegn,
                                                },
                                            ),
                                        ),
                                    ]}
                                    description={intl.formatMessage({ id: 'skjema.risikofaktorer.description' })}
                                />
                                <div>
                                    <RhfTextarea
                                        name="tilretteleggingstiltak"
                                        control={formMethods.control}
                                        label={labelTiltak}
                                        validate={[
                                            validateTilretteleggingstiltak(intl),
                                            hasLegalChars((ugyldigeTegn: string) =>
                                                intl.formatMessage(
                                                    { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
                                                    {
                                                        feltNavn: labelTiltak,
                                                        ugyldigeTegn: ugyldigeTegn,
                                                    },
                                                ),
                                            ),
                                        ]}
                                    />
                                    <ReadMore
                                        size="small"
                                        header={intl.formatMessage({ id: 'tilrettelegging.tiltak.info.title' })}
                                        onOpenChange={(open) =>
                                            loggUmamiEvent({
                                                origin: 'svangerskapspengesoknad',
                                                eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                                eventData: { tittel: 'tilrettelegging.tiltak.info.title' },
                                            })
                                        }
                                    >
                                        <BodyShort>
                                            <FormattedMessage id="tilrettelegging.tiltak.info.description"></FormattedMessage>
                                        </BodyShort>
                                    </ReadMore>
                                </div>
                            </>
                        )}
                        <div>
                            <RhfRadioGroup
                                name="type"
                                control={formMethods.control}
                                label={getLabel(
                                    erFlereTilrettelegginger,
                                    typeArbeidsforhold,
                                    intl,
                                    false,
                                    navnArbeidsgiver,
                                )}
                                description={
                                    harSkjema
                                        ? intl.formatMessage({
                                              id: 'tilrettelegging.tilrettelagtArbeidType.description',
                                          })
                                        : ''
                                }
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidType.mangler' }),
                                    ),
                                ]}
                            >
                                <Radio value={'delvis'}>
                                    <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.delvis" />
                                </Radio>
                                <Radio value={'ingen'}>
                                    <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.ingen" />
                                </Radio>
                            </RhfRadioGroup>
                            <ReadMore
                                header={intl.formatMessage({
                                    id: 'tilrettelegging.tilrettelagtArbeidType.info.tittel',
                                })}
                                onOpenChange={(open) =>
                                    loggUmamiEvent({
                                        origin: 'svangerskapspengesoknad',
                                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                        eventData: {
                                            tittel: 'tilrettelegging.tilrettelagtArbeidType.info.tittel',
                                        },
                                    })
                                }
                            >
                                <BodyShort>
                                    <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.info.tekst"></FormattedMessage>
                                </BodyShort>
                            </ReadMore>
                        </div>
                        {type === 'ingen' && (
                            <IngenTilretteleggingPanel
                                barnet={barnet}
                                arbeidsforholdType={typeArbeidsforhold}
                                startdatoArbeid={periode.fom}
                                sluttdatoArbeid={periode.tom}
                                arbeidsforholdNavn={navnArbeidsgiver}
                            />
                        )}
                        {type === 'delvis' && (
                            <DelvisTilretteleggingPanel
                                barnet={barnet}
                                arbeidsforholdType={typeArbeidsforhold}
                                startdatoArbeid={periode.fom}
                                sluttdatoArbeid={periode.tom}
                                stillinger={stillinger}
                                arbeidsforholdNavn={navnArbeidsgiver}
                            />
                        )}
                        <ExpansionCard size="small" aria-label="">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title size="small" as="h3">
                                    <FormattedMessage id="tilrettelegging.expansion.tittel" />
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <BodyLong>
                                    <FormattedMessage
                                        id="tilrettelegging.expansion.tekst"
                                        values={{
                                            em: (msg) => <em>{msg}</em>,
                                        }}
                                    />
                                </BodyLong>
                            </ExpansionCard.Content>
                        </ExpansionCard>
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
};
