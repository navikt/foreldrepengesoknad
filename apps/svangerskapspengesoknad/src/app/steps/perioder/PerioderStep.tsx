import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Heading, ReadMore, Tag } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, intlUtils } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import SøknadRoutes from 'app/routes/routes';
import { TilOgMedDatoType } from 'app/types/Tilrettelegging';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import { getOpprinneligStillingsprosent } from 'app/utils/tilretteleggingUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { getPeriodeInfoTekst } from 'app/utils/perioderUtils';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import {
    getSisteDagForSvangerskapspenger,
    getKanHaSvpFremTilTreUkerFørTermin,
    getDefaultMonth,
} from 'app/utils/dateUtils';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import { validatePeriodeFom, validatePeriodeTom, validatePeriodeTomType } from './perioderValidation';
import { getBackLinkPerioderSteg, useStepConfig } from '../stepsConfig';
import { PerioderFormComponents, PerioderFormData, PerioderFormField } from './perioderStepFormConfig';
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
import { validateStillingsprosentPåPerioder } from '../tilrettelegging/tilretteleggingValidation';
import { getRadioOptionsTomType } from '../tilrettelegging/tilretteleggingStepUtils';

import './perioderStep.css';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import BackButton from '../BackButton';
import { Søkerinfo } from 'app/types/Søkerinfo';

export interface Props {
    id: string;
    navn: string;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
}

const PerioderStep: FunctionComponent<Props> = ({ navn, id, mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const bem = bemUtils('perioderStep');

    const tilretteleggingFraState = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGING));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const currentTilretteleggingId = useContextGetData(ContextDataType.TILRETTELEGGING_ID);

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);

    const currentTilrettelegging = notEmpty(tilretteleggingFraState.find((t) => t.id === id));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;

    const sluttDatoArbeid = currentTilrettelegging.arbeidsforhold.sluttdato;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
    const maxDato = sluttDatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const minDatoFom = new Date(currentTilrettelegging.behovForTilretteleggingFom);

    const onSubmit = (values: Partial<PerioderFormData>) => {
        setIsSubmitting(true);

        const mappedTilrettelegging = mapPerioderFormDataToState(id, values, tilretteleggingFraState);
        oppdaterTilrettelegging(mappedTilrettelegging);

        let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
        const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingFraState, currentTilretteleggingId);
        if (nesteTilretteleggingId) {
            nextRoute = `${SøknadRoutes.SKJEMA}/${nesteTilretteleggingId}`;
        }
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <PerioderFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getPerioderInitialValues(currentTilrettelegging)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const opprinneligStillingsprosent = getOpprinneligStillingsprosent(
                    formValues.varierendePerioder,
                    currentTilrettelegging.arbeidsforhold.stillinger,
                );
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
                        pageTitle={getPeriodeSideTittel(erFlereTilrettelegginger, navn, intl)}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
                    >
                        <PerioderFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {erFlereTilrettelegginger && (
                                <Block padBottom="xxl">
                                    <Bedriftsbanner arbeid={currentTilrettelegging.arbeidsforhold} />
                                </Block>
                            )}
                            <Block padBottom="xl">
                                <Heading size="small">{intlUtils(intl, 'perioder.varierende.heading')}</Heading>
                                <BodyShort>{getDescriptionTekst(kanHaSVPFremTilTreUkerFørTermin, intl)}</BodyShort>
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
                                                                icon={<XMarkIcon aria-hidden />}
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
                                                            currentTilrettelegging.behovForTilretteleggingFom,
                                                            sisteDagForSvangerskapspenger,
                                                            currentTilrettelegging.arbeidsforhold.navn,
                                                            sluttDatoArbeid,
                                                            kanHaSVPFremTilTreUkerFørTermin,
                                                        )}
                                                        dayPickerProps={{
                                                            defaultMonth: getDefaultMonth(minDatoFom, maxDato),
                                                        }}
                                                        placeholder={'dd.mm.åååå'}
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
                                                            currentTilrettelegging.arbeidsforhold.navn,
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
                                                            currentTilrettelegging.arbeidsforhold.navn,
                                                            sluttDatoArbeid,
                                                            kanHaSVPFremTilTreUkerFørTermin,
                                                        )}
                                                        minDate={minDatoTom}
                                                        maxDate={maxDato}
                                                        dayPickerProps={{ defaultMonth: defaultMonthTom }}
                                                        placeholder={'dd.mm.åååå'}
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
                                                            validate={validateStillingsprosentPåPerioder(
                                                                intl,
                                                                måSendeNySøknad,
                                                                periodeDerSøkerErTilbakeIOpprinneligStilling,
                                                                formValues.varierendePerioder,
                                                                opprinneligStillingsprosent,
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
                                                                icon={<PlusIcon aria-hidden />}
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
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getBackLinkPerioderSteg(currentTilretteleggingId)}
                                    />
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
