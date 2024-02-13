import { Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, date20YearsAgo, date5MonthsAgo } from '@navikt/fp-common';
import { useIntl } from 'react-intl';
import {
    getBackLinkForArbeidIUtlandetSteg,
    getNextRouteValgAvArbeidEllerSkjema,
    useStepConfig,
} from 'app/steps/stepsConfig';
import {
    ArbeidIUtlandetFormComponents,
    ArbeidIUtlandetFormData,
    ArbeidIUtlandetFormField,
} from './arbeidIUtlandetFormConfig';
import { FieldArray } from 'formik';
import {
    cleanUpArbeidIUtlandetFormData,
    getInitialArbeidIUtlandetFormData,
    getUferdigArbeidIUtlandetInput,
    mapArbeidIUtlandetTilState,
} from './arbeidIUtlandetFormUtils';
import dayjs from 'dayjs';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
    validateArbeidIUtlandetFom,
    validateArbeidIUtlandetLand,
    validateArbeidIUtlandetNavnArbeidsgiver,
    validateArbeidIUtlandetPågående,
    validateArbeidIUtlandetTom,
} from './arbeidIUtlandetValidation';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import './arbeidIUtlandet.css';
import { useState } from 'react';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import BackButton from '../BackButton';
import { Arbeidsforhold } from '@navikt/fp-types';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const ArbeidIUtlandetStep: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const bem = bemUtils('arbeidIUtlandet');
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));

    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<ArbeidIUtlandetFormData>) => {
        setIsSubmitting(true);

        const arbeidIUtlandet = mapArbeidIUtlandetTilState(values);
        oppdaterArbeidIUtlandet(arbeidIUtlandet);

        const { nextRoute, nextTilretteleggingId } = getNextRouteValgAvArbeidEllerSkjema(
            barnet.termindato,
            arbeidsforhold,
            inntektsinformasjon,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <ArbeidIUtlandetFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getInitialArbeidIUtlandetFormData(arbeidIUtlandet)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const navnPåArbeidsgiverLabel = intl.formatMessage({ id: 'arbeidIUtlandet.navn' });
                return (
                    <Step
                        bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
                        activeStepId="arbeidIUtlandet"
                        pageTitle={intl.formatMessage({ id: 'steps.label.arbeidIUtlandet' })}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
                    >
                        <ArbeidIUtlandetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanUpArbeidIUtlandetFormData(values)}
                        >
                            <FieldArray
                                validateOnChange={false}
                                name={ArbeidIUtlandetFormField.arbeidIUtlandet}
                                render={(arrayHelpers) =>
                                    formValues.arbeidIUtlandet &&
                                    formValues.arbeidIUtlandet.length > 0 &&
                                    formValues.arbeidIUtlandet.map((_a, index) => (
                                        <div key={index}>
                                            <Block padBottom="xxl" className={bem.element('countrySelect')}>
                                                <ArbeidIUtlandetFormComponents.CountrySelect
                                                    name={`arbeidIUtlandet.${index}.land`}
                                                    style={{ width: 'var(--app-text-input-width)' }}
                                                    label={intl.formatMessage({ id: 'arbeidIUtlandet.land' })}
                                                    useAlpha3Code={false}
                                                    validate={validateArbeidIUtlandetLand(intl)}
                                                />
                                                {index !== 0 && (
                                                    <Button
                                                        className={bem.element('delete')}
                                                        icon={<XMarkIcon aria-hidden />}
                                                        type="button"
                                                        variant="tertiary"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {intl.formatMessage({ id: 'perioder.varierende.slett' })}
                                                    </Button>
                                                )}
                                            </Block>
                                            <Block padBottom="xxl">
                                                <ArbeidIUtlandetFormComponents.TextField
                                                    name={`arbeidIUtlandet.${index}.arbeidsgiverNavn`}
                                                    style={{ width: 'var(--app-text-input-width)' }}
                                                    label={navnPåArbeidsgiverLabel}
                                                    validate={validateArbeidIUtlandetNavnArbeidsgiver(
                                                        intl,
                                                        navnPåArbeidsgiverLabel,
                                                    )}
                                                    maxLength={100}
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <ArbeidIUtlandetFormComponents.DatePicker
                                                    name={`arbeidIUtlandet.${index}.fom`}
                                                    label={intl.formatMessage({ id: 'arbeidIUtlandet.fom' })}
                                                    placeholder={'dd.mm.åååå'}
                                                    fullscreenOverlay={true}
                                                    showYearSelector={true}
                                                    validate={validateArbeidIUtlandetFom(
                                                        intl,
                                                        formValues.arbeidIUtlandet![index].tom,
                                                    )}
                                                    maxDate={dayjs().toDate()}
                                                    minDate={date20YearsAgo}
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <ArbeidIUtlandetFormComponents.YesOrNoQuestion
                                                    name={`arbeidIUtlandet.${index}.pågående`}
                                                    legend={intl.formatMessage({ id: 'egenNæring.næring.pågående' })}
                                                    validate={validateArbeidIUtlandetPågående(intl)}
                                                />
                                            </Block>
                                            <Block
                                                padBottom="xxl"
                                                visible={formValues.arbeidIUtlandet![index].pågående === YesOrNo.NO}
                                            >
                                                <ArbeidIUtlandetFormComponents.DatePicker
                                                    name={`arbeidIUtlandet.${index}.tom`}
                                                    label={intl.formatMessage({ id: 'arbeidIUtlandet.tom' })}
                                                    description={intl.formatMessage({
                                                        id: 'egenNæring.arbeid.tom.description',
                                                    })}
                                                    placeholder={'dd.mm.åååå'}
                                                    fullscreenOverlay={true}
                                                    showYearSelector={true}
                                                    validate={validateArbeidIUtlandetTom(
                                                        intl,
                                                        formValues.arbeidIUtlandet![index].fom,
                                                    )}
                                                    maxDate={dayjs().add(9, 'month').toDate()}
                                                    minDate={getMinInputTilOgMedValue(
                                                        formValues.arbeidIUtlandet![index].fom,
                                                        date5MonthsAgo,
                                                    )}
                                                />
                                            </Block>
                                            {formValues.arbeidIUtlandet && formValues.arbeidIUtlandet.length > 1 && (
                                                <HorizontalLine />
                                            )}
                                            {formValues.arbeidIUtlandet &&
                                                index === formValues.arbeidIUtlandet.length - 1 && (
                                                    <Block padBottom="xl">
                                                        <Button
                                                            icon={<PlusIcon aria-hidden />}
                                                            type="button"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                arrayHelpers.push(getUferdigArbeidIUtlandetInput())
                                                            }
                                                        >
                                                            {intl.formatMessage({ id: 'arbeidIUtlandet.tittel.ny' })}
                                                        </Button>
                                                    </Block>
                                                )}
                                        </div>
                                    ))
                                }
                            />
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getBackLinkForArbeidIUtlandetSteg(inntektsinformasjon)}
                                    />
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intl.formatMessage({ id: 'søknad.gåVidere' })}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </ArbeidIUtlandetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default ArbeidIUtlandetStep;
