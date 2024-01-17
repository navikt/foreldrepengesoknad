import { Block, ISOStringToDate, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getBackLinkForTilretteleggingSteg, getNextRouteForTilretteleggingSteg } from '../stepsConfig';
import { BodyLong, BodyShort, Button, ExpansionCard, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
    DelivisTilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import {
    cleanUpTilretteleggingStepFormValues,
    getBehovForTilretteleggingFomLabel,
    getLabelPeriodeFom,
    getLabelPeriodeTom,
    getLabelPeriodeTomType,
    getMinDatoPeriodeFom,
    getMinDatoTilbakeIJobb,
    getRadioOptionsTomType,
    getTilretteleggingInitialValues,
    getTilretteleggingSideTittel,
    getTilretteleggingTypeLabel,
    mapOmTilretteleggingFormDataToState,
} from './tilretteleggingStepUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent, useState } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import {
    getSisteDagForSvangerskapspenger,
    getKanHaSvpFremTilTreUkerFørTermin,
    tiMånederSidenDato,
    getDefaultMonth,
} from 'app/utils/dateUtils';
import tilretteleggingQuestionsConfig, {
    TilretteleggingFormQuestionsPayload,
} from './tilretteleggingStepQuestionsConfig';
import {
    validateRisikofaktorer,
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTilbakeIJobbDato,
    validateStillingsprosentEnDelvisPeriode,
    validateTilretteleggingstiltak,
    validateBehovForTilretteleggingFom,
    validateTilrettelagtArbeidType,
    validateTilretteleggingPeriodetype,
    validerTilretteleggingTomType,
} from './tilretteleggingValidation';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH } from 'app/utils/validationUtils';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import dayjs from 'dayjs';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';

const finnRisikofaktorLabel = (intl: IntlShape, typeArbeid: Arbeidsforholdstype) => {
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'skjema.risikofaktorer.frilanser');
    } else {
        return intlUtils(intl, 'skjema.risikofaktorer.selvstendig');
    }
};

interface Props {
    id: string;
    typeArbeid: Arbeidsforholdstype;
    navn: string;
}

const TilretteleggingStep: FunctionComponent<Props> = ({ navn, id, typeArbeid }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const [nextRoute, setNextRoute] = useState(SøknadRoutes.OPPSUMMERING.toString());
    const { arbeidsforhold } = useSøkerinfo();
    const søknad = useSøknad();
    const { tilrettelegging: tilretteleggingFraState, barn } = søknad;
    const { termindato } = barn;
    const { state } = useSvangerskapspengerContext();
    const onAvbrytSøknad = useAvbrytSøknad();
    const currentTilrettelegging = tilretteleggingFraState.find((t) => t.id === id);
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const termindatoDate = ISOStringToDate(termindato);
    const navnArbeidsgiver =
        currentTilrettelegging!.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG &&
        currentTilrettelegging!.arbeidsforhold.navn.trim().length === 0
            ? intlUtils(intl, 'egenNæring').toLowerCase()
            : currentTilrettelegging!.arbeidsforhold.navn;
    const onValidSubmitHandler = (values: Partial<TilretteleggingFormData>) => {
        const mappedTilrettelegging = mapOmTilretteleggingFormDataToState(
            id,
            values,
            tilretteleggingFraState,
            currentTilrettelegging!,
        );
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;
    const sideTittel = getTilretteleggingSideTittel(erFlereTilrettelegginger, intl, navn);

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const risikofaktorerLabel = finnRisikofaktorLabel(intl, typeArbeid);

    const tilretteleggingTypeLabel = getTilretteleggingTypeLabel(
        erFlereTilrettelegginger,
        typeArbeid,
        navnArbeidsgiver,
        intl,
    );
    const behovForTilretteleggingFomLabel = getBehovForTilretteleggingFomLabel(
        erFlereTilrettelegginger,
        typeArbeid,
        navnArbeidsgiver,
        intl,
    );
    const labelTiltak = intlUtils(intl, 'tilrettelegging.tilretteleggingstiltak.label');
    const harSkjema = typeArbeid === Arbeidsforholdstype.VIRKSOMHET || typeArbeid === Arbeidsforholdstype.PRIVAT;
    const stillinger = currentTilrettelegging!.arbeidsforhold.stillinger;
    const sluttDatoArbeid = currentTilrettelegging!.arbeidsforhold.sluttdato;
    const startDatoArbeid = currentTilrettelegging!.arbeidsforhold.startdato;
    const minDatoBehovFom = dayjs.max(dayjs(tiMånederSidenDato(termindatoDate!)), dayjs(startDatoArbeid))!.toDate();
    const maxDatoBehovFom = sluttDatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
    const defaultMonthBehovFomDato = getDefaultMonth(minDatoBehovFom, maxDatoBehovFom);
    return (
        <TilretteleggingFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getTilretteleggingInitialValues(currentTilrettelegging!)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = tilretteleggingQuestionsConfig.getVisbility({
                    ...formValues,
                    arbeidsType: typeArbeid,
                } as TilretteleggingFormQuestionsPayload);
                const labelPeriodeFomTekst = getLabelPeriodeFom(formValues.tilretteleggingType, intl);
                const labelPeriodeTomTypeTekst = getLabelPeriodeTomType(formValues.tilretteleggingType, intl);
                const labelPeriodeTomTekst = getLabelPeriodeTom(formValues.tilretteleggingType, intl);
                const minDatoPeriodeFom = getMinDatoPeriodeFom(formValues, minDatoBehovFom);
                const defaultMonthPeriodeFom = getDefaultMonth(minDatoPeriodeFom, maxDatoBehovFom);
                const minDatoTilbakeIJobb = getMinDatoTilbakeIJobb(formValues);
                const defaultMonthTilbakeIJobb = getDefaultMonth(minDatoTilbakeIJobb, maxDatoBehovFom);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId={`tilrettelegging-${id}`}
                        pageTitle={sideTittel}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        supportsTempSaving={false}
                    >
                        <TilretteleggingFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanUpTilretteleggingStepFormValues(values, visibility)}
                        >
                            {erFlereTilrettelegginger && (
                                <Block padBottom="xxl">
                                    <Bedriftsbanner arbeid={currentTilrettelegging!.arbeidsforhold} />
                                </Block>
                            )}
                            <Block padBottom="xxl">
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.behovForTilretteleggingFom}
                                    label={behovForTilretteleggingFomLabel}
                                    placeholder={'dd.mm.åååå'}
                                    description={
                                        harSkjema
                                            ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.description')
                                            : ''
                                    }
                                    minDate={minDatoBehovFom}
                                    maxDate={maxDatoBehovFom}
                                    validate={validateBehovForTilretteleggingFom(
                                        intl,
                                        sisteDagForSvangerskapspenger,
                                        termindatoDate!,
                                        currentTilrettelegging!.arbeidsforhold.navn,
                                        startDatoArbeid,
                                        sluttDatoArbeid,
                                        kanHaSVPFremTilTreUkerFørTermin,
                                        typeArbeid === Arbeidsforholdstype.FRILANSER,
                                    )}
                                    dayPickerProps={{ defaultMonth: defaultMonthBehovFomDato }}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(TilretteleggingFormField.risikofaktorer)}
                            >
                                <TilretteleggingFormComponents.Textarea
                                    name={TilretteleggingFormField.risikofaktorer}
                                    label={risikofaktorerLabel}
                                    minLength={TEXT_INPUT_MIN_LENGTH}
                                    maxLength={TEXT_INPUT_MAX_LENGTH}
                                    validate={validateRisikofaktorer(intl, risikofaktorerLabel, typeArbeid)}
                                    description={intlUtils(intl, 'skjema.risikofaktorer.description')}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(TilretteleggingFormField.tilretteleggingstiltak)}
                            >
                                <Block padBottom="m">
                                    <TilretteleggingFormComponents.Textarea
                                        name={TilretteleggingFormField.tilretteleggingstiltak}
                                        label={labelTiltak}
                                        minLength={TEXT_INPUT_MIN_LENGTH}
                                        maxLength={TEXT_INPUT_MAX_LENGTH}
                                        validate={validateTilretteleggingstiltak(intl, labelTiltak)}
                                    />
                                </Block>
                                <ReadMore size="small" header={intlUtils(intl, 'tilrettelegging.tiltak.info.title')}>
                                    <BodyShort>
                                        <FormattedMessage id="tilrettelegging.tiltak.info.description"></FormattedMessage>
                                    </BodyShort>
                                </ReadMore>
                            </Block>
                            <Block padBottom="xxl">
                                <Block padBottom="m">
                                    <TilretteleggingFormComponents.RadioGroup
                                        name={TilretteleggingFormField.tilretteleggingType}
                                        legend={tilretteleggingTypeLabel}
                                        description={
                                            harSkjema
                                                ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                                : ''
                                        }
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.delvis'),
                                                value: TilretteleggingstypeOptions.DELVIS,
                                            },
                                            {
                                                label: intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.ingen'),
                                                value: TilretteleggingstypeOptions.INGEN,
                                            },
                                        ]}
                                        validate={validateTilrettelagtArbeidType(intl)}
                                    />
                                </Block>
                                <ReadMore
                                    header={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.info.tittel')}
                                >
                                    <BodyShort>
                                        <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.info.tekst"></FormattedMessage>
                                    </BodyShort>
                                </ReadMore>
                            </Block>

                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(
                                    TilretteleggingFormField.delvisTilretteleggingPeriodeType,
                                )}
                            >
                                <TilretteleggingFormComponents.RadioGroup
                                    name={TilretteleggingFormField.delvisTilretteleggingPeriodeType}
                                    legend={intlUtils(intl, 'tilrettelegging.tilretteleggingPeriodetype.label')}
                                    description={
                                        harSkjema
                                            ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                            : ''
                                    }
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilretteleggingPeriodetype.en'),
                                            value: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                                        },
                                        {
                                            label: intlUtils(
                                                intl,
                                                'tilrettelegging.tilretteleggingPeriodetype.variert',
                                            ),
                                            value: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
                                        },
                                    ]}
                                    validate={validateTilretteleggingPeriodetype(intl)}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(
                                    TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent,
                                )}
                            >
                                <Block padBottom="m">
                                    <TilretteleggingFormComponents.NumberInput
                                        name={TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent}
                                        label={intlUtils(intl, 'tilrettelegging.stillingsprosent.label')}
                                        description={
                                            harSkjema
                                                ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                                : ''
                                        }
                                        validate={validateStillingsprosentEnDelvisPeriode(
                                            intl,
                                            formValues.enPeriodeMedTilretteleggingFom,
                                            stillinger,
                                        )}
                                    />
                                </Block>
                                <ReadMore
                                    header={intlUtils(
                                        intl,
                                        'tilrettelegging.varierendePerioderStillingsprosent.info.tittel',
                                    )}
                                >
                                    <Block padBottom="l">
                                        <BodyShort>
                                            <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"></FormattedMessage>
                                        </BodyShort>
                                    </Block>
                                    <Block>
                                        <BodyShort>
                                            <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"></FormattedMessage>
                                        </BodyShort>
                                    </Block>
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(TilretteleggingFormField.enPeriodeMedTilretteleggingFom)}
                            >
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingFom}
                                    label={labelPeriodeFomTekst}
                                    description={
                                        harSkjema
                                            ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                            : ''
                                    }
                                    minDate={new Date(minDatoPeriodeFom)}
                                    maxDate={maxDatoBehovFom}
                                    validate={validateSammePeriodeFremTilTerminFom(
                                        intl,
                                        formValues.behovForTilretteleggingFom,
                                        sisteDagForSvangerskapspenger,
                                        formValues.tilretteleggingType!,
                                        currentTilrettelegging!.arbeidsforhold.navn,
                                        sluttDatoArbeid,
                                        kanHaSVPFremTilTreUkerFørTermin,
                                    )}
                                    dayPickerProps={{ defaultMonth: defaultMonthPeriodeFom }}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>

                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(
                                    TilretteleggingFormField.enPeriodeMedTilretteleggingTomType,
                                )}
                            >
                                <TilretteleggingFormComponents.RadioGroup
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingTomType}
                                    legend={labelPeriodeTomTypeTekst}
                                    radios={getRadioOptionsTomType(intl, kanHaSVPFremTilTreUkerFørTermin)}
                                    validate={validerTilretteleggingTomType(
                                        intl,
                                        formValues.tilretteleggingType!,
                                        formValues.behovForTilretteleggingFom,
                                        sisteDagForSvangerskapspenger,
                                        currentTilrettelegging!.arbeidsforhold.navn,
                                        sluttDatoArbeid,
                                        kanHaSVPFremTilTreUkerFørTermin,
                                    )}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(
                                    TilretteleggingFormField.enPeriodeMedTilretteleggingTilbakeIJobbDato,
                                )}
                            >
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingTilbakeIJobbDato}
                                    label={labelPeriodeTomTekst}
                                    minDate={minDatoTilbakeIJobb}
                                    maxDate={maxDatoBehovFom}
                                    validate={validateSammePeriodeFremTilTerminTilbakeIJobbDato(
                                        intl,
                                        formValues.behovForTilretteleggingFom,
                                        sisteDagForSvangerskapspenger,
                                        formValues.enPeriodeMedTilretteleggingFom,
                                        formValues.tilretteleggingType!,
                                        currentTilrettelegging!.arbeidsforhold.navn,
                                        sluttDatoArbeid,
                                        kanHaSVPFremTilTreUkerFørTermin,
                                    )}
                                    dayPickerProps={{ defaultMonth: defaultMonthTilbakeIJobb }}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block padBottom="xxl">
                                <ExpansionCard size="small" aria-label="">
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title size="small" as="h3">
                                            <FormattedMessage id="tilrettelegging.expansion.tittel" />
                                        </ExpansionCard.Title>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <Block padBottom="l">
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="tilrettelegging.expansion.tekst"
                                                    values={{
                                                        em: (msg: any) => <em>{msg}</em>,
                                                    }}
                                                />
                                            </BodyLong>
                                        </Block>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </Block>
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkForTilretteleggingSteg(state.currentTilretteleggingId)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        onClick={() =>
                                            setNextRoute(
                                                getNextRouteForTilretteleggingSteg(
                                                    formValues,
                                                    tilretteleggingFraState,
                                                    currentTilrettelegging!.id,
                                                ),
                                            )
                                        }
                                    >
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </TilretteleggingFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default TilretteleggingStep;
