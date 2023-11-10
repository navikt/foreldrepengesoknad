import { Block, Step, StepButtonWrapper, bemUtils, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getBackLinkPerioderSteg } from '../stepsConfig';
import { Alert, BodyShort, Button, Heading, ReadMore, Tag } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PerioderFormComponents, PerioderFormData, PerioderFormField } from './perioderStepFormConfig';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { TilOgMedDatoType } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { validatePeriodeFom, validatePeriodeTom, validatePeriodeTomType } from './perioderValidation';
import { FieldArray } from 'formik';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import {
    getDescriptionTekst,
    getMinDatoTom,
    getMåSendeNySøknad,
    getPeriodeDerSøkerErTilbakeIFullStilling,
    getPeriodeSideTittel,
    getPerioderInitialValues,
    getUferdigPeriodeInput,
    mapPerioderFormDataToState,
} from './perioderStepUtils';
import { validateStillingsprosentPerioder } from '../tilrettelegging/tilretteleggingValidation';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import { getPeriodeInfoTekst } from 'app/utils/perioderUtils';
import './perioderStep.css';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import dayjs from 'dayjs';
import {
    getSisteDagForSvangerskapspenger,
    getKanHaSvpFremTilTreUkerFørTermin,
    getDefaultMonth,
} from 'app/utils/dateUtils';
import { getRadioOptionsTomType } from '../tilrettelegging/tilretteleggingStepUtils';

export interface Props {
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
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;

    const onValidSubmitHandler = (values: Partial<PerioderFormData>) => {
        const mappedTilrettelegging = mapPerioderFormDataToState(id, values, tilretteleggingFraState);
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingFraState, state.currentTilretteleggingId);
    let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
    if (nesteTilretteleggingId) {
        nextRoute = `${SøknadRoutes.SKJEMA}/${nesteTilretteleggingId}`;
    }
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const sluttDatoArbeid = currentTilrettelegging!.arbeidsforhold.sluttdato;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
    const maxDato = sluttDatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const minDatoFom = new Date(currentTilrettelegging!.behovForTilretteleggingFom);
    const sideTittel = getPeriodeSideTittel(erFlereTilrettelegginger, navn, intl);
    const descriptionTekst = getDescriptionTekst(kanHaSVPFremTilTreUkerFørTermin, intl);
    const defaultMonthFom = getDefaultMonth(minDatoFom, maxDato);

    return (
        <PerioderFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getPerioderInitialValues(currentTilrettelegging!)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const periodeDerSøkerErTilbakeIOpprinneligStilling = getPeriodeDerSøkerErTilbakeIFullStilling(
                    formValues.varierendePerioder,
                    opprinneligStillingsprosent,
                );

                const uferdigDelvisTilretteleggingInput = getUferdigPeriodeInput(
                    formValues,
                    sisteDagForSvangerskapspenger,
                );
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
                                <BodyShort>{descriptionTekst}</BodyShort>
                            </Block>
                            <FieldArray
                                validateOnChange={false}
                                name={PerioderFormField.varierendePerioder}
                                render={(arrayHelpers) =>
                                    formValues.varierendePerioder &&
                                    formValues.varierendePerioder.length > 0 &&
                                    formValues.varierendePerioder.map((p, index) => {
                                        const måSendeNySøknad = getMåSendeNySøknad(
                                            periodeDerSøkerErTilbakeIOpprinneligStilling,
                                            p,
                                            opprinneligStillingsprosent,
                                        );
                                        const minDatoTom = getMinDatoTom(
                                            formValues.varierendePerioder![index].fom,
                                            minDatoFom,
                                        );
                                        const defaultMonthTom = getDefaultMonth(minDatoTom, maxDato);
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
                                                        minDate={minDatoFom}
                                                        maxDate={maxDato}
                                                        name={`varierendePerioder.${index}.fom`}
                                                        label={intlUtils(intl, 'perioder.varierende.fom.label')}
                                                        validate={validatePeriodeFom(
                                                            intl,
                                                            index,
                                                            formValues.varierendePerioder,
                                                            currentTilrettelegging!.behovForTilretteleggingFom,
                                                            sisteDagForSvangerskapspenger,
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            sluttDatoArbeid,
                                                            kanHaSVPFremTilTreUkerFørTermin,
                                                        )}
                                                        dayPickerProps={{ defaultMonth: defaultMonthFom }}
                                                    />
                                                </Block>
                                                <Block padBottom="xxl">
                                                    <PerioderFormComponents.RadioGroup
                                                        name={`varierendePerioder.${index}.tomType`}
                                                        key={`varierendePerioder.${index}.tomType`}
                                                        legend={intlUtils(intl, 'perioder.varierende.tomType.label')}
                                                        radios={getRadioOptionsTomType(
                                                            intl,
                                                            kanHaSVPFremTilTreUkerFørTermin,
                                                        )}
                                                        validate={validatePeriodeTomType(
                                                            intl,
                                                            sisteDagForSvangerskapspenger,
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            sluttDatoArbeid,
                                                            kanHaSVPFremTilTreUkerFørTermin,
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
                                                            currentTilrettelegging!.arbeidsforhold.navn,
                                                            sluttDatoArbeid,
                                                            kanHaSVPFremTilTreUkerFørTermin,
                                                        )}
                                                        minDate={minDatoTom}
                                                        maxDate={maxDato}
                                                        dayPickerProps={{ defaultMonth: defaultMonthTom }}
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
                                                                måSendeNySøknad,
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
                                                {måSendeNySøknad && (
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
