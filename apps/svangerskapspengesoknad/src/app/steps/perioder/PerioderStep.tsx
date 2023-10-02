import { Block, ISOStringToDate, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getBackLinkPerioderSteg } from '../stepsConfig';
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PerioderFormComponents, PerioderFormData, PerioderFormField } from './perioderStepFormConfig';

import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { PeriodeMedVariasjon, TilOgMedDatoType, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { treUkerSiden } from 'app/utils/dateUtils';

import { validatePeriodeFom, validatePeriodeTom } from './perioderValidation';
import { FieldArray } from 'formik';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import { getPerioderInitialValues, mapPerioderFormDataToState } from './perioderStepUtils';
import { hasValue } from 'app/utils/validationUtils';
import { validateStillingsprosent } from '../tilrettelegging/tilretteleggingValidation';
import ArbeidsgiverVisning from '../tilrettelegging/components/ArbeidsgiverVisning';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';

interface Props {
    id: string;
    navn: string;
}

const PerioderStep: FunctionComponent<Props> = ({ navn, id }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const { tilrettelegging: tilretteleggingFraState, barn, søker } = useSøknad();
    const { fødselsdato, termindato } = barn;
    const { state } = useSvangerskapspengerContext();
    const { arbeidsforhold } = useSøkerinfo();
    const onAvbrytSøknad = useAvbrytSøknad();
    const currentTilrettelegging = tilretteleggingFraState.find((t) => t.id === id);
    const fødselsdatoDate = ISOStringToDate(fødselsdato);
    const termindatoDate = ISOStringToDate(termindato);
    const onValidSubmitHandler = (values: Partial<PerioderFormData>) => {
        const mappedTilrettelegging = mapPerioderFormDataToState(id, values, tilretteleggingFraState);
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;
    const sideTittel = erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.periode.flere', { navn })
        : intlUtils(intl, 'steps.label.periode.en');

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingFraState, state.currentTilretteleggingId);

    const treUkerFørFødselEllerTermin = treUkerSiden(fødselsdatoDate || termindatoDate!);
    let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
    if (nesteTilretteleggingId) {
        nextRoute = `${SøknadRoutes.TILRETTELEGGING}/${nesteTilretteleggingId}`;
    }

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const uferdigDelvisTilretteleggingInput = {
        fom: '',
        tom: '',
        stillingsprosent: '',
        tomType: undefined!,
        type: Tilretteleggingstype.DELVIS,
    } as PeriodeMedVariasjon;

    return (
        <PerioderFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getPerioderInitialValues(currentTilrettelegging!)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const minDatoPeriodeFom = currentTilrettelegging!.behovForTilretteleggingFom!;

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="periode"
                        pageTitle={sideTittel}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, erFlereTilrettelegginger ? navn : undefined)}
                    >
                        <PerioderFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {erFlereTilrettelegginger && (
                                <>
                                    <Block padBottom="m">
                                        <Alert variant="info">
                                            <FormattedMessage id="tilrettelegging.flereTilrettelegginger.perioder.info" />
                                        </Alert>
                                    </Block>
                                    <Block padBottom="xxl">
                                        <ArbeidsgiverVisning
                                            currentTilrettelegging={currentTilrettelegging!}
                                            arbeidsforhold={arbeidsforhold}
                                            frilans={søker.frilansInformasjon}
                                            egenNæring={søker.selvstendigNæringsdrivendeInformasjon}
                                        />
                                    </Block>
                                </>
                            )}
                            <Block padBottom="xl">
                                <Heading size="small">{intlUtils(intl, 'perioder.varierende.heading')}</Heading>
                                <BodyShort>{intlUtils(intl, 'perioder.varierende.description')}</BodyShort>
                            </Block>
                            <FieldArray
                                validateOnChange={false}
                                name={PerioderFormField.variertePerioder}
                                render={(arrayHelpers) =>
                                    formValues.variertePerioder &&
                                    formValues.variertePerioder.length > 0 &&
                                    formValues.variertePerioder.map((_p, index) => (
                                        <div key={index}>
                                            <Block padBottom="xxl">
                                                <PerioderFormComponents.DatePicker
                                                    key={`variertePerioder.${index}.fom`}
                                                    minDate={new Date(minDatoPeriodeFom)}
                                                    maxDate={treUkerSiden(
                                                        ISOStringToDate(fødselsdato) || ISOStringToDate(termindato)!,
                                                    )}
                                                    name={`variertePerioder.${index}.fom`}
                                                    label={intlUtils(intl, 'perioder.varierende.fom.label')}
                                                    validate={validatePeriodeFom(
                                                        intl,
                                                        index,
                                                        formValues.variertePerioder,
                                                        currentTilrettelegging!.behovForTilretteleggingFom,
                                                        treUkerFørFødselEllerTermin,
                                                        fødselsdato,
                                                    )}
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <PerioderFormComponents.RadioGroup
                                                    name={`variertePerioder.${index}.tomType`}
                                                    key={`variertePerioder.${index}.tomType`}
                                                    legend={intlUtils(intl, 'perioder.varierende.tomType.label')}
                                                    radios={[
                                                        {
                                                            label: intlUtils(
                                                                intl,
                                                                'perioder.varierende.tomType.valgfriDato',
                                                            ),
                                                            value: TilOgMedDatoType.VALGFRI_DATO,
                                                        },
                                                        {
                                                            label: intlUtils(
                                                                intl,
                                                                'perioder.varierende.tomType.treUkerFørTermin',
                                                            ),
                                                            value: TilOgMedDatoType.TRE_UKER_FØR_TERMIN,
                                                        },
                                                    ]}
                                                    validate={(value: string) => {
                                                        if (!hasValue(value)) {
                                                            return intlUtils(intl, 'valideringsfeil.tomType.påkrevd');
                                                        }
                                                        return undefined;
                                                    }}
                                                />
                                            </Block>
                                            <Block
                                                padBottom="xxl"
                                                visible={
                                                    formValues.variertePerioder![index].tomType ===
                                                    TilOgMedDatoType.VALGFRI_DATO
                                                }
                                            >
                                                <PerioderFormComponents.DatePicker
                                                    key={`variertePerioder.${index}.tom`}
                                                    name={`variertePerioder.${index}.tom`}
                                                    label={intlUtils(intl, 'perioder.varierende.tom.label')}
                                                    validate={validatePeriodeTom(
                                                        intl,
                                                        index,
                                                        formValues.variertePerioder,
                                                        treUkerFørFødselEllerTermin,
                                                        fødselsdato,
                                                    )}
                                                />
                                            </Block>

                                            <Block padBottom="xxl">
                                                <PerioderFormComponents.NumberInput
                                                    key={`variertePerioder.${index}.stillingsprosent`}
                                                    name={`variertePerioder.${index}.stillingsprosent`}
                                                    label={intlUtils(
                                                        intl,
                                                        'perioder.varierende.stillingsprosent.label',
                                                    )}
                                                    validate={validateStillingsprosent(intl)}
                                                    onClick={(e: any) => e.preventDefault()}
                                                />
                                            </Block>
                                            {index !== 0 && (
                                                <Block>
                                                    <Button
                                                        icon={<TrashIcon />}
                                                        type="button"
                                                        variant="tertiary"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {intlUtils(intl, 'perioder.varierende.slett')}
                                                    </Button>
                                                </Block>
                                            )}
                                            {formValues.variertePerioder && formValues.variertePerioder.length > 1 && (
                                                <HorizontalLine />
                                            )}
                                            {formValues.variertePerioder &&
                                                index === formValues.variertePerioder.length - 1 && (
                                                    <Block padBottom="xl">
                                                        <Button
                                                            icon={<PlusIcon />}
                                                            type="button"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                arrayHelpers.push({
                                                                    ...uferdigDelvisTilretteleggingInput,
                                                                })
                                                            }
                                                        >
                                                            {intlUtils(intl, 'perioder.varierende.leggTil')}
                                                        </Button>
                                                    </Block>
                                                )}
                                        </div>
                                    ))
                                }
                            />

                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkPerioderSteg(state.currentTilretteleggingId)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </PerioderFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default PerioderStep;
