import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverNavnForTilrettelegging,
    getArbeidsgiverStillingerForTilrettelegging,
    getNesteTilretteleggingId,
    getPeriodeForTilrettelegging,
    getTilretteleggingId,
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
import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { capitalizeFirstLetterInEveryWordOnly, tiMånederSidenDato } from '@navikt/fp-utils';
import { hasLegalChars, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import Bedriftsbanner from '../Bedriftsbanner';
import DelvisTilretteleggingPanel from './DelvisTilretteleggingPanel';
import IngenTilretteleggingPanel from './IngenTilretteleggingPanel';
import {
    validateBehovForTilretteleggingFom,
    validateRisikofaktorer,
    validateTilretteleggingstiltak,
} from './tilretteleggingValidation';

const getNextRouteAndTilretteleggingIdForTilretteleggingSteg = (
    values: DelvisTilrettelegging | IngenTilrettelegging,
    currentTilretteleggingId: string,
    valgteArbeidsforholdIder?: string[],
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    if (
        values.type === Tilretteleggingstype.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return { nextRoute: SøknadRoutes.PERIODER, nextTilretteleggingId: currentTilretteleggingId };
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(currentTilretteleggingId, valgteArbeidsforholdIder);
    if (nesteTilretteleggingId) {
        return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: nesteTilretteleggingId };
    }
    return { nextRoute: SøknadRoutes.OPPSUMMERING };
};

const finnRisikofaktorLabel = (intl: IntlShape, typeArbeid: Arbeidsforholdstype) =>
    typeArbeid === Arbeidsforholdstype.FRILANSER
        ? intl.formatMessage({ id: 'skjema.risikofaktorer.frilanser' })
        : intl.formatMessage({ id: 'skjema.risikofaktorer.selvstendig' });

const getLabel = (
    erFlereTilrettelegginger: boolean,
    typeArbeid: Arbeidsforholdstype,
    intl: IntlShape,
    erFom: boolean,
    navnArbeidsgiver?: string,
) => {
    if (erFlereTilrettelegginger && typeArbeid !== Arbeidsforholdstype.FRILANSER) {
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
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return erFom
            ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidFom.label.frilanser' })
            : intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.label.frilanser' });
    }

    return erFom
        ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidFom.label.en' })
        : intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.label.en' });
};

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
}

export const TilretteleggingStep: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const valgtId = useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const valgtTilretteleggingId =
        valgtId || getTilretteleggingId(arbeidsforhold, barnet, arbeidsforholdOgInntekt, valgteArbeidsforhold);

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
    const harSkjema =
        typeArbeidsforhold === Arbeidsforholdstype.VIRKSOMHET || typeArbeidsforhold === Arbeidsforholdstype.PRIVAT;

    const periode = getPeriodeForTilrettelegging(
        barnet.termindato,
        valgtTilretteleggingId,
        arbeidsforhold,
        egenNæring,
        frilans,
    );
    const minDatoBehovFom = dayjs.max(dayjs(tiMånederSidenDato(barnet.termindato)), dayjs(periode.fom)) || undefined;
    const maxDatoBehovFom = periode.tom
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(periode.tom))!.toDate()
        : sisteDagForSvangerskapspenger;

    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const onSubmit = (values: DelvisTilrettelegging | IngenTilrettelegging) => {
        oppdaterTilrettelegginger({ ...tilrettelegginger, [valgtTilretteleggingId]: values });

        const { nextRoute, nextTilretteleggingId } = getNextRouteAndTilretteleggingIdForTilretteleggingSteg(
            values,
            valgtTilretteleggingId,
            valgteArbeidsforhold,
        );
        if (nextTilretteleggingId) {
            oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        }

        return navigator.goToNextStep(nextRoute);
    };

    const formMethods = useForm<DelvisTilrettelegging | IngenTilrettelegging>({
        shouldUnregister: true,
        defaultValues: tilrettelegging,
    });

    const type = formMethods.watch('type');

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToNextStep}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {erFlereTilrettelegginger && (
                        <Bedriftsbanner arbeidsforholdType={typeArbeidsforhold} arbeidsforholdNavn={navnArbeidsgiver} />
                    )}
                    <RhfDatepicker
                        name="behovForTilretteleggingFom"
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
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.gyldigDato' })),
                            validateBehovForTilretteleggingFom(
                                intl,
                                sisteDagForSvangerskapspenger,
                                barnet.termindato,
                                navnArbeidsgiver || '',
                                periode.fom,
                                periode.tom,
                                kanHaSVPFremTilTreUkerFørTermin,
                                typeArbeidsforhold === Arbeidsforholdstype.FRILANSER,
                            ),
                        ]}
                        defaultMonth={minDatoBehovFom ? getDefaultMonth(minDatoBehovFom, maxDatoBehovFom) : undefined}
                    />
                    {(typeArbeidsforhold === Arbeidsforholdstype.FRILANSER ||
                        typeArbeidsforhold === Arbeidsforholdstype.SELVSTENDIG) && (
                        <>
                            <RhfTextarea
                                name="risikofaktorer"
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
                                    onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Tiltak')}
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
                            label={getLabel(
                                erFlereTilrettelegginger,
                                typeArbeidsforhold,
                                intl,
                                false,
                                navnArbeidsgiver,
                            )}
                            description={
                                harSkjema
                                    ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.description' })
                                    : ''
                            }
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidType.mangler' }),
                                ),
                            ]}
                        >
                            <Radio value={Tilretteleggingstype.DELVIS}>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.delvis" />
                            </Radio>
                            <Radio value={Tilretteleggingstype.INGEN}>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.ingen" />
                            </Radio>
                        </RhfRadioGroup>
                        <ReadMore
                            header={intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.info.tittel' })}
                            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Bytte_på_stillingsprosent')}
                        >
                            <BodyShort>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.info.tekst"></FormattedMessage>
                            </BodyShort>
                        </ReadMore>
                    </div>
                    {type === Tilretteleggingstype.INGEN && (
                        <IngenTilretteleggingPanel
                            barnet={barnet}
                            arbeidsforholdType={typeArbeidsforhold}
                            sluttdatoArbeid={periode.fom}
                            startdatoArbeid={periode.tom}
                            arbeidsforholdNavn={navnArbeidsgiver}
                        />
                    )}
                    {type === Tilretteleggingstype.DELVIS && (
                        <DelvisTilretteleggingPanel
                            barnet={barnet}
                            arbeidsforholdType={typeArbeidsforhold}
                            sluttdatoArbeid={periode.fom}
                            startdatoArbeid={periode.tom}
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
                                        em: (msg: any) => <em>{msg}</em>,
                                    }}
                                />
                            </BodyLong>
                        </ExpansionCard.Content>
                    </ExpansionCard>
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};
