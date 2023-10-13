import { Block, ISOStringToDate, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getBackLinkForTilretteleggingSteg, getNextRouteForTilretteleggingSteg } from '../stepsConfig';
import { BodyLong, Button, ExpansionCard, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
    DelivisTilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import {
    cleanUpTilretteleggingStepFormValues,
    getTilretteleggingInitialValues,
    mapOmTilretteleggingFormDataToState,
} from './tilretteleggingStepUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype, TilOgMedDatoType, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent, useState } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { dagenFør3UkerFørFamiliehendelse, tiMånederSidenDato } from 'app/utils/dateUtils';
import {
    validateTilrettelagtArbeidFom,
    validateTilrettelagtArbeidType,
    validateTilretteleggingPeriodetype,
} from 'app/utils/tilretteleggingUtils';
import tilretteleggingQuestionsConfig, {
    TilretteleggingFormQuestionsPayload,
} from './tilretteleggingStepQuestionsConfig';
import {
    validateRisikofaktorer,
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTom,
    validateStillingsprosent,
    validateTilretteleggingstiltak,
} from './tilretteleggingValidation';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, hasValue } from 'app/utils/validationUtils';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';

interface Props {
    id: string;
    typeArbeid: Arbeidsforholdstype;
    navn: string;
}

const TilretteleggingStep: FunctionComponent<Props> = ({ navn, id, typeArbeid }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const [nextRoute, setNextRoute] = useState(SøknadRoutes.OPPSUMMERING.toString());
    const { tilrettelegging: tilretteleggingFraState, barn } = useSøknad();
    const { termindato, fødselsdato, erBarnetFødt } = barn;
    const { state } = useSvangerskapspengerContext();
    const onAvbrytSøknad = useAvbrytSøknad();
    const currentTilrettelegging = tilretteleggingFraState.find((t) => t.id === id);
    const familiehendelsedato = erBarnetFødt ? fødselsdato! : termindato;
    const sisteDagForSvangerskapspenger = dagenFør3UkerFørFamiliehendelse(familiehendelsedato);
    const termindatoDate = ISOStringToDate(termindato);
    const navnArbeidsgiver = currentTilrettelegging!.arbeidsforhold.navn;
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
    const sideTittel = erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.tilrettelegging.flere', { navn })
        : intlUtils(intl, 'steps.label.tilrettelegging.en');

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const risikofaktorerLabel = intlUtils(intl, `skjema.risikofaktorer.${typeArbeid}`);

    let tilretteleggingTypeLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.en');
    let behovForTilretteleggingFomLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.en');

    if (erFlereTilrettelegginger && typeArbeid !== Arbeidsforholdstype.FRILANSER) {
        tilretteleggingTypeLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.flere', {
            navnArbeidsgiver,
        });
        behovForTilretteleggingFomLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.flere', {
            navnArbeidsgiver,
        });
    }
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        tilretteleggingTypeLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.frilanser');
        behovForTilretteleggingFomLabel = intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.frilanser');
    }
    const labelTiltak = intlUtils(intl, 'tilrettelegging.tilretteleggingstiltak.label');
    const harSkjema = typeArbeid === Arbeidsforholdstype.VIRKSOMHET || typeArbeid === Arbeidsforholdstype.PRIVAT;
    const opprinneligStillingsprosent = currentTilrettelegging!.arbeidsforhold.opprinneligstillingsprosent;
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
                const labelPeriodeFom =
                    formValues.tilretteleggingType === TilretteleggingstypeOptions.INGEN
                        ? 'tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen'
                        : 'tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis';
                const labelPeriodeTomType =
                    formValues.tilretteleggingType === TilretteleggingstypeOptions.INGEN
                        ? 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen'
                        : 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis';
                const labelPeriodeTom =
                    formValues.tilretteleggingType === TilretteleggingstypeOptions.INGEN
                        ? 'tilrettelegging.enPeriodeMedTilretteleggingTom.label.ingen'
                        : 'tilrettelegging.enPeriodeMedTilretteleggingTom.label.delvis';

                const minDatoPeriodeFom = hasValue(formValues.behovForTilretteleggingFom)
                    ? formValues.behovForTilretteleggingFom!
                    : dateToISOString(tiMånederSidenDato(termindatoDate!));
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="tilrettelegging"
                        pageTitle={sideTittel}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, erFlereTilrettelegginger ? navn : undefined)}
                        useNoTempSavingText={true}
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
                                    minDate={tiMånederSidenDato(termindatoDate!)}
                                    maxDate={sisteDagForSvangerskapspenger}
                                    validate={validateTilrettelagtArbeidFom(
                                        intl,
                                        sisteDagForSvangerskapspenger,
                                        termindatoDate!,
                                        erBarnetFødt,
                                    )}
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
                                    validate={validateRisikofaktorer(
                                        intl,
                                        risikofaktorerLabel,
                                        typeArbeid,
                                        TilretteleggingFormField.risikofaktorer,
                                    )}
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
                                        validate={validateTilretteleggingstiltak(
                                            intl,
                                            labelTiltak,
                                            TilretteleggingFormField.tilretteleggingstiltak,
                                        )}
                                    />
                                </Block>
                                <ReadMore size="small" header={intlUtils(intl, 'tilrettelegging.tiltak.info.title')}>
                                    <FormattedMessage id="tilrettelegging.tiltak.info.description"></FormattedMessage>
                                </ReadMore>
                            </Block>
                            <Block padBottom="xxl">
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

                            <Block padBottom="xxl">
                                <ExpansionCard size="small" aria-label="">
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title size="small" as="h2">
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
                                <TilretteleggingFormComponents.NumberInput
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent}
                                    label={intlUtils(intl, 'tilrettelegging.stillingsprosent.label')}
                                    description={
                                        harSkjema
                                            ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                            : ''
                                    }
                                    validate={validateStillingsprosent(intl, opprinneligStillingsprosent)}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(TilretteleggingFormField.enPeriodeMedTilretteleggingFom)}
                            >
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingFom}
                                    label={intlUtils(intl, labelPeriodeFom)}
                                    description={
                                        harSkjema
                                            ? intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')
                                            : ''
                                    }
                                    minDate={new Date(minDatoPeriodeFom)}
                                    maxDate={sisteDagForSvangerskapspenger}
                                    validate={validateSammePeriodeFremTilTerminFom(
                                        intl,
                                        formValues.behovForTilretteleggingFom,
                                        sisteDagForSvangerskapspenger,
                                        fødselsdato,
                                        formValues.enPeriodeMedTilretteleggingTom,
                                        formValues.tilretteleggingType!,
                                    )}
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
                                    legend={intlUtils(intl, labelPeriodeTomType)}
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'perioder.varierende.tomType.valgfriDato'),
                                            value: TilOgMedDatoType.VALGFRI_DATO,
                                        },
                                        {
                                            label: intlUtils(intl, 'perioder.varierende.tomType.treUkerFørTermin'),
                                            value: TilOgMedDatoType.TRE_UKER_FØR_TERMIN,
                                        },
                                    ]}
                                    validate={(value: string) => {
                                        if (!hasValue(value)) {
                                            return formValues.tilretteleggingType === TilretteleggingstypeOptions.DELVIS
                                                ? intlUtils(intl, 'valideringsfeil.tomType.påkrevd.delvis')
                                                : intlUtils(intl, 'valideringsfeil.tomType.påkrevd.ingen');
                                        }
                                        return undefined;
                                    }}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(TilretteleggingFormField.enPeriodeMedTilretteleggingTom)}
                            >
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.enPeriodeMedTilretteleggingTom}
                                    label={intlUtils(intl, labelPeriodeTom)}
                                    minDate={
                                        hasValue(formValues.enPeriodeMedTilretteleggingFom)
                                            ? new Date(formValues.enPeriodeMedTilretteleggingFom!)
                                            : new Date(formValues.behovForTilretteleggingFom!)
                                    }
                                    maxDate={sisteDagForSvangerskapspenger}
                                    validate={validateSammePeriodeFremTilTerminTom(
                                        intl,
                                        formValues.behovForTilretteleggingFom,
                                        sisteDagForSvangerskapspenger,
                                        fødselsdato,
                                        formValues.enPeriodeMedTilretteleggingFom,
                                    )}
                                />
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
