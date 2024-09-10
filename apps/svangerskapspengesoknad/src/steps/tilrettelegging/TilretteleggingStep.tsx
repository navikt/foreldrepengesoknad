import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { DelivisTilretteleggingPeriodeType } from 'types/DelivisTilretteleggingPeriodeType';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';

import { BodyLong, BodyShort, ExpansionCard, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    Datepicker,
    ErrorSummaryHookForm,
    Form,
    RadioGroup,
    StepButtonsHookForm,
    TextArea,
} from '@navikt/fp-form-hooks';
import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { capitalizeFirstLetterInEveryWordOnly, tiMånederSidenDato } from '@navikt/fp-utils';
import { hasLegalChars, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import Bedriftsbanner from '../Bedriftsbanner';
import DelvisTilretteleggingPanel from './DelvisTilretteleggingPanel';
import IngenTilretteleggingPanel from './IngenTilretteleggingPanel';
import { TilretteleggingFormData, mapOmTilretteleggingFormDataToState } from './tilretteleggingStepUtils';
import {
    validateBehovForTilretteleggingFom,
    validateRisikofaktorer,
    validateTilretteleggingstiltak,
} from './tilretteleggingValidation';

const getNesteTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
): string | undefined => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};

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

const TilretteleggingStep: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const valgtTilretteleggingId = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const currentTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);
    const navnArbeidsgiver =
        currentTilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG &&
        currentTilrettelegging.arbeidsforhold.navn &&
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

        return navigator.goToNextStep(nextRoute);
    };

    const formMethods = useForm<TilretteleggingFormData>({
        shouldUnregister: true,
        defaultValues: currentTilrettelegging,
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
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {erFlereTilrettelegginger && <Bedriftsbanner arbeid={currentTilrettelegging.arbeidsforhold} />}
                    <Datepicker
                        name="behovForTilretteleggingFom"
                        label={getLabel(erFlereTilrettelegginger, typeArbeid, intl, true, navnArbeidsgiver)}
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
                                currentTilrettelegging.arbeidsforhold.navn || '',
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
                        <RadioGroup
                            name="type"
                            label={getLabel(erFlereTilrettelegginger, typeArbeid, intl, false, navnArbeidsgiver)}
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
                            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Bytte_på_stillingsprosent')}
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
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default TilretteleggingStep;
