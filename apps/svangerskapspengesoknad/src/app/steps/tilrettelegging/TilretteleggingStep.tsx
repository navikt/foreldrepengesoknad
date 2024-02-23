import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyLong, BodyShort, ExpansionCard, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { Step } from '@navikt/fp-common';
import {
    Datepicker,
    ErrorSummaryHookForm,
    Form,
    RadioGroup,
    StepButtonsHookForm,
    TextArea,
} from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { tiMånederSidenDato } from '@navikt/fp-utils';
import { hasLegalChars, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import { DelivisTilretteleggingPeriodeType } from 'app/types/DelivisTilretteleggingPeriodeType';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import {
    getDefaultMonth,
    getKanHaSvpFremTilTreUkerFørTermin,
    getSisteDagForSvangerskapspenger,
} from 'app/utils/dateUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH } from 'app/utils/validationUtils';

import Bedriftsbanner from '../Bedriftsbanner';
import { getNesteTilretteleggingId, useStepConfig } from '../stepsConfig';
import DelvisTilretteleggingPanel from './DelvisTilretteleggingPanel';
import IngenTilretteleggingPanel from './IngenTilretteleggingPanel';
import { TilretteleggingFormData, mapOmTilretteleggingFormDataToState } from './tilretteleggingStepUtils';
import {
    validateBehovForTilretteleggingFom,
    validateRisikofaktorer,
    validateTilretteleggingstiltak,
} from './tilretteleggingValidation';

const getNextRouteAndTilretteleggingIdForTilretteleggingSteg = (
    values: TilretteleggingFormData,
    tilrettelegging: Tilrettelegging[],
    currentTilretteleggingId: string,
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    if (
        values.type === TilretteleggingstypeOptions.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return { nextRoute: SøknadRoutes.PERIODER, nextTilretteleggingId: currentTilretteleggingId };
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilrettelegging, currentTilretteleggingId);
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
    navnArbeidsgiver: string,
    intl: IntlShape,
    erFom: boolean,
) => {
    if (erFlereTilrettelegginger && typeArbeid !== Arbeidsforholdstype.FRILANSER) {
        return erFom
            ? intl.formatMessage(
                  { id: 'tilrettelegging.tilrettelagtArbeidFom.label.flere' },
                  {
                      navnArbeidsgiver,
                  },
              )
            : intl.formatMessage(
                  { id: 'tilrettelegging.tilrettelagtArbeidType.label.flere' },
                  {
                      navnArbeidsgiver,
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

const TilretteleggingStep: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const valgtTilretteleggingId = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const currentTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);
    const navnArbeidsgiver =
        currentTilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG &&
        currentTilrettelegging.arbeidsforhold.navn.trim().length === 0
            ? intl.formatMessage({ id: 'egenNæring' }).toLowerCase()
            : currentTilrettelegging.arbeidsforhold.navn;

    const erFlereTilrettelegginger = tilrettelegginger.length > 1;
    const typeArbeid = currentTilrettelegging.arbeidsforhold.type;
    const risikofaktorerLabel = finnRisikofaktorLabel(intl, typeArbeid);

    const labelTiltak = intl.formatMessage({ id: 'tilrettelegging.tilretteleggingstiltak.label' });
    const harSkjema = typeArbeid === Arbeidsforholdstype.VIRKSOMHET || typeArbeid === Arbeidsforholdstype.PRIVAT;
    const sluttDatoArbeid = currentTilrettelegging.arbeidsforhold.sluttdato;
    const startDatoArbeid = currentTilrettelegging.arbeidsforhold.startdato;
    const minDatoBehovFom =
        dayjs.max(dayjs(tiMånederSidenDato(barnet.termindato)), dayjs(startDatoArbeid)) || undefined;
    const maxDatoBehovFom = sluttDatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const onSubmit = (values: TilretteleggingFormData) => {
        const mappedTilrettelegginger = mapOmTilretteleggingFormDataToState(
            valgtTilretteleggingId,
            values,
            tilrettelegginger,
            currentTilrettelegging,
        );
        oppdaterTilrettelegginger(mappedTilrettelegginger);

        const { nextRoute, nextTilretteleggingId } = getNextRouteAndTilretteleggingIdForTilretteleggingSteg(
            values,
            tilrettelegginger,
            currentTilrettelegging.id,
        );
        if (nextTilretteleggingId) {
            oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        }

        oppdaterAppRoute(nextRoute);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<TilretteleggingFormData>({
        shouldUnregister: true,
        defaultValues: currentTilrettelegging,
    });

    const type = formMethods.watch('type');

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId={`tilrettelegging-${valgtTilretteleggingId}`}
            pageTitle={
                erFlereTilrettelegginger
                    ? intl.formatMessage(
                          { id: 'steps.label.tilrettelegging.flere' },
                          { navn: currentTilrettelegging.arbeidsforhold.navn },
                      )
                    : intl.formatMessage({ id: 'steps.label.tilrettelegging.en' })
            }
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {erFlereTilrettelegginger && <Bedriftsbanner arbeid={currentTilrettelegging.arbeidsforhold} />}
                    <Datepicker
                        name="behovForTilretteleggingFom"
                        label={getLabel(erFlereTilrettelegginger, typeArbeid, navnArbeidsgiver, intl, true)}
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
                                currentTilrettelegging.arbeidsforhold.navn,
                                startDatoArbeid,
                                sluttDatoArbeid,
                                kanHaSVPFremTilTreUkerFørTermin,
                                typeArbeid === Arbeidsforholdstype.FRILANSER,
                            ),
                        ]}
                        defaultMonth={minDatoBehovFom ? getDefaultMonth(minDatoBehovFom, maxDatoBehovFom) : undefined}
                    />
                    {(typeArbeid === Arbeidsforholdstype.FRILANSER ||
                        typeArbeid === Arbeidsforholdstype.SELVSTENDIG) && (
                        <>
                            <TextArea
                                name="risikofaktorer"
                                label={risikofaktorerLabel}
                                minLength={TEXT_INPUT_MIN_LENGTH}
                                maxLength={TEXT_INPUT_MAX_LENGTH}
                                validate={[
                                    validateRisikofaktorer(intl, typeArbeid),
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
                                <TextArea
                                    name="tilretteleggingstiltak"
                                    label={labelTiltak}
                                    minLength={TEXT_INPUT_MIN_LENGTH}
                                    maxLength={TEXT_INPUT_MAX_LENGTH}
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
                                >
                                    <BodyShort>
                                        <FormattedMessage id="tilrettelegging.tiltak.info.description"></FormattedMessage>
                                    </BodyShort>
                                </ReadMore>
                            </div>
                        </>
                    )}
                    <div>
                        <RadioGroup
                            name="type"
                            label={getLabel(erFlereTilrettelegginger, typeArbeid, navnArbeidsgiver, intl, false)}
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
                            <Radio value={TilretteleggingstypeOptions.DELVIS}>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.delvis" />
                            </Radio>
                            <Radio value={TilretteleggingstypeOptions.INGEN}>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.ingen" />
                            </Radio>
                        </RadioGroup>
                        <ReadMore
                            header={intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.info.tittel' })}
                        >
                            <BodyShort>
                                <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.info.tekst"></FormattedMessage>
                            </BodyShort>
                        </ReadMore>
                    </div>
                    {type === TilretteleggingstypeOptions.INGEN && (
                        <IngenTilretteleggingPanel barnet={barnet} valgtTilrettelegging={currentTilrettelegging} />
                    )}
                    {type === TilretteleggingstypeOptions.DELVIS && (
                        <DelvisTilretteleggingPanel barnet={barnet} valgtTilrettelegging={currentTilrettelegging} />
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
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            oppdaterAppRoute(SøknadRoutes.SKJEMA);
                            mellomlagreSøknadOgNaviger();
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default TilretteleggingStep;
