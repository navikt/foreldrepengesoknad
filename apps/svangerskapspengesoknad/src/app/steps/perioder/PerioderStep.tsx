import { Block, ISOStringToDate, Step, StepButtonWrapper, bemUtils, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getBackLinkPerioderSteg } from '../stepsConfig';
import { Alert, BodyShort, Button, Heading, ReadMore, Tag } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PerioderFormComponents, PerioderFormData, PerioderFormField } from './perioderStepFormConfig';

import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { PeriodeMedVariasjon, TilOgMedDatoType, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { dagenFør3UkerFørFamiliehendelse } from 'app/utils/dateUtils';

import { validatePeriodeFom, validatePeriodeTom, validatePeriodeTomType } from './perioderValidation';
import { FieldArray } from 'formik';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import { getMåSendeNySøknad, getPerioderInitialValues, mapPerioderFormDataToState } from './perioderStepUtils';
import { hasValue } from 'app/utils/validationUtils';
import { validateStillingsprosentPerioder } from '../tilrettelegging/tilretteleggingValidation';
import { getNesteDagEtterSistePeriode } from 'app/utils/tilretteleggingUtils';
import { isISODateString } from '@navikt/ds-datepicker';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import { getPeriodeInfoTekst } from 'app/utils/perioderUtils';
import './perioderStep.css';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
interface Props {
    id: string;
    navn: string;
}

const PerioderStep: FunctionComponent<Props> = ({ navn, id }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const bem = bemUtils('perioderStep');
    const søknad = useSøknad();
    const { tilrettelegging: tilretteleggingFraState, barn } = søknad;
    const { state } = useSvangerskapspengerContext();
    const { arbeidsforhold } = useSøkerinfo();
    const onAvbrytSøknad = useAvbrytSøknad();

    const currentTilrettelegging = tilretteleggingFraState.find((t) => t.id === id);
    const opprinneligStillingsprosent = currentTilrettelegging!.arbeidsforhold.opprinneligstillingsprosent;
    const familiehendelsedato = barn.erBarnetFødt ? barn.fødselsdato : barn.termindato;
    const sisteDagForSvangerskapspenger = dagenFør3UkerFørFamiliehendelse(familiehendelsedato!);

    const onValidSubmitHandler = (values: Partial<PerioderFormData>) => {
        const mappedTilrettelegging = mapPerioderFormDataToState(id, values, tilretteleggingFraState);
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;
    const sideTittel = erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.periode.flere', { navn })
        : intlUtils(intl, 'steps.label.periode.en');

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingFraState, state.currentTilretteleggingId);
    let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
    if (nesteTilretteleggingId) {
        nextRoute = `${SøknadRoutes.SKJEMA}/${nesteTilretteleggingId}`;
    }

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    return (
        <PerioderFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getPerioderInitialValues(currentTilrettelegging!)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const minDatoPeriodeFom = currentTilrettelegging!.behovForTilretteleggingFom!;
                const periodeDerSøkerErTilbakeIOpprinneligStilling = formValues.varierendePerioder
                    ? formValues.varierendePerioder.find(
                          (p) =>
                              hasValue(p.stillingsprosent) &&
                              parseInt(p.stillingsprosent!, 10) === opprinneligStillingsprosent,
                      )
                    : undefined;
                const uferdigDelvisTilretteleggingInput = {
                    fom: getNesteDagEtterSistePeriode(formValues, sisteDagForSvangerskapspenger),
                    tom: '',
                    stillingsprosent: '',
                    tomType: undefined!,
                    type: TilretteleggingstypeOptions.DELVIS,
                } as PeriodeMedVariasjon;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId={`periode-${id}`}
                        pageTitle={sideTittel}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        useNoTempSavingText={true}
                    >
                        <PerioderFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {erFlereTilrettelegginger && (
                                <Block padBottom="xxl">
                                    <Bedriftsbanner arbeid={currentTilrettelegging!.arbeidsforhold} />
                                </Block>
                            )}
                            <Block padBottom="xl">
                                <Heading size="small">{intlUtils(intl, 'perioder.varierende.heading')}</Heading>
                                <BodyShort>{intlUtils(intl, 'perioder.varierende.description')}</BodyShort>
                            </Block>
                            <FieldArray
                                validateOnChange={false}
                                name={PerioderFormField.varierendePerioder}
                                render={(arrayHelpers) =>
                                    formValues.varierendePerioder &&
                                    formValues.varierendePerioder.length > 0 &&
                                    formValues.varierendePerioder.map((p, index) => {
                                        const måSøkeSendeNySøknad = getMåSendeNySøknad(
                                            periodeDerSøkerErTilbakeIOpprinneligStilling,
                                            p,
                                            opprinneligStillingsprosent,
                                        );
                                        const fomInputDate =
                                            formValues.varierendePerioder && formValues.varierendePerioder[index].fom;
                                        const minDatoTom =
                                            fomInputDate && isISODateString(fomInputDate)
                                                ? ISOStringToDate(fomInputDate)
                                                : undefined;
                                        return (
                                            <div key={index}>
                                                <Block padBottom="xxl">
                                                    <HorizontalLine />
                                                    <Block padBottom="l" className={bem.element('info')}>
                                                        <Tag variant="info" className={bem.element('tag')}>
                                                            {getPeriodeInfoTekst(
                                                                formValues,
                                                                index,
                                                                sisteDagForSvangerskapspenger,
                                                                intl,
                                                            )}
                                                        </Tag>
                                                        {index !== 0 && (
                                                            <Button
                                                                icon={<TrashIcon />}
                                                                type="button"
                                                                variant="tertiary"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                {intlUtils(intl, 'perioder.varierende.slett')}
                                                            </Button>
                                                        )}
                                                    </Block>
                                                    <PerioderFormComponents.DatePicker
                                                        key={`varierendePerioder.${index}.fom`}
                                                        minDate={new Date(minDatoPeriodeFom)}
                                                        maxDate={sisteDagForSvangerskapspenger}
                                                        name={`varierendePerioder.${index}.fom`}
                                                        label={intlUtils(intl, 'perioder.varierende.fom.label')}
                                                        validate={validatePeriodeFom(
                                                            intl,
                                                            index,
                                                            formValues.varierendePerioder,
                                                            currentTilrettelegging!.behovForTilretteleggingFom,
                                                            sisteDagForSvangerskapspenger,
                                                            barn.erBarnetFødt,
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            currentTilrettelegging!.arbeidsforhold.sluttdato,
                                                        )}
                                                    />
                                                </Block>
                                                <Block padBottom="xxl">
                                                    <PerioderFormComponents.RadioGroup
                                                        name={`varierendePerioder.${index}.tomType`}
                                                        key={`varierendePerioder.${index}.tomType`}
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
                                                        validate={validatePeriodeTomType(
                                                            intl,
                                                            sisteDagForSvangerskapspenger,
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            currentTilrettelegging!.arbeidsforhold.sluttdato,
                                                        )}
                                                    />
                                                </Block>
                                                <Block
                                                    padBottom="xxl"
                                                    visible={
                                                        formValues.varierendePerioder![index].tomType ===
                                                        TilOgMedDatoType.VALGFRI_DATO
                                                    }
                                                >
                                                    <PerioderFormComponents.DatePicker
                                                        key={`varierendePerioder.${index}.tom`}
                                                        name={`varierendePerioder.${index}.tom`}
                                                        label={intlUtils(intl, 'perioder.varierende.tom.label')}
                                                        validate={validatePeriodeTom(
                                                            intl,
                                                            index,
                                                            formValues.varierendePerioder,
                                                            sisteDagForSvangerskapspenger,
                                                            barn.fødselsdato,
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            currentTilrettelegging!.arbeidsforhold.sluttdato,
                                                        )}
                                                        minDate={minDatoTom}
                                                        maxDate={sisteDagForSvangerskapspenger}
                                                    />
                                                </Block>
                                                <Block padBottom="xxl">
                                                    <Block padBottom="m">
                                                        <PerioderFormComponents.NumberInput
                                                            key={`varierendePerioder.${index}.stillingsprosent`}
                                                            name={`varierendePerioder.${index}.stillingsprosent`}
                                                            label={intlUtils(
                                                                intl,
                                                                'perioder.varierende.stillingsprosent.label',
                                                            )}
                                                            description={intlUtils(
                                                                intl,
                                                                'tilrettelegging.tilrettelagtArbeidType.description',
                                                            )}
                                                            validate={validateStillingsprosentPerioder(
                                                                intl,
                                                                opprinneligStillingsprosent,
                                                                måSøkeSendeNySøknad,
                                                                periodeDerSøkerErTilbakeIOpprinneligStilling,
                                                                formValues.varierendePerioder,
                                                            )}
                                                            onClick={(e: any) => e.preventDefault()}
                                                        />
                                                    </Block>
                                                    <ReadMore
                                                        size="medium"
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
                                                {måSøkeSendeNySøknad && (
                                                    <Block padBottom="xxl">
                                                        <Alert variant="warning">
                                                            <Block padBottom="m">
                                                                <Heading size="small">
                                                                    {intlUtils(intl, 'perioder.alert.nySøknad.title')}
                                                                </Heading>
                                                            </Block>
                                                            <Block padBottom="m">
                                                                {intlUtils(intl, 'perioder.alert.nySøknad.del1')}
                                                            </Block>
                                                            <Block padBottom="m">
                                                                {intlUtils(intl, 'perioder.alert.nySøknad.del2')}
                                                            </Block>
                                                        </Alert>
                                                    </Block>
                                                )}
                                                {formValues.varierendePerioder &&
                                                    index === formValues.varierendePerioder.length - 1 && (
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
                                        );
                                    })
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
