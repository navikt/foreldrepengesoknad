import { Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, date20YearsAgo, date4WeeksAgo, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import stepConfig, {
    getBackLinkForArbeidIUtlandetSteg,
    getNextRouteValgAvArbeidEllerSkjema,
} from 'app/steps/stepsConfig';
import { Link } from 'react-router-dom';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
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
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import {
    validateArbeidIUtlandetFom,
    validateArbeidIUtlandetLand,
    validateArbeidIUtlandetNavnArbeidsgiver,
    validateArbeidIUtlandetPågående,
    validateArbeidIUtlandetTom,
} from './arbeidIUtlandetValidation';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';

const ArbeidIUtlandetStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn } = useSøknad();
    const arbeidIUtlandet = søker.andreInntekter;

    const onValidSubmitHandler = (values: Partial<ArbeidIUtlandetFormData>) => {
        const arbeidIUtlandet = mapArbeidIUtlandetTilState(values);
        const søkerMedArbeidIUtlandet = { ...søker, andreInntekter: arbeidIUtlandet };
        return [actionCreator.setSøker(søkerMedArbeidIUtlandet)];
    };
    const nextRoute = getNextRouteValgAvArbeidEllerSkjema(barn.termindato, arbeidsforhold, søker);
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <ArbeidIUtlandetFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getInitialArbeidIUtlandetFormData(arbeidIUtlandet)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const navnPåArbeidsgiverLabel = intlUtils(intl, 'arbeidIUtlandet.navn');
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeidIUtlandet"
                        pageTitle={intlUtils(intl, 'steps.label.arbeidIUtlandet')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                        useNoTempSavingText={true}
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
                                            <Block padBottom="xxl">
                                                <ArbeidIUtlandetFormComponents.CountrySelect
                                                    name={`arbeidIUtlandet.${index}.land`}
                                                    style={{ width: 'var(--app-text-input-width)' }}
                                                    label={intlUtils(intl, 'arbeidIUtlandet.land')}
                                                    useAlpha3Code={false}
                                                    validate={validateArbeidIUtlandetLand(intl)}
                                                />
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
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <ArbeidIUtlandetFormComponents.DatePicker
                                                    name={`arbeidIUtlandet.${index}.fom`}
                                                    label={intlUtils(intl, 'arbeidIUtlandet.fom')}
                                                    placeholder="dd.mm.åååå"
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
                                                    legend={intlUtils(intl, 'egenNæring.næring.pågående')}
                                                    validate={validateArbeidIUtlandetPågående(intl)}
                                                />
                                            </Block>
                                            <Block
                                                padBottom="xxl"
                                                visible={formValues.arbeidIUtlandet![index].pågående === YesOrNo.NO}
                                            >
                                                <ArbeidIUtlandetFormComponents.DatePicker
                                                    name={`arbeidIUtlandet.${index}.tom`}
                                                    label={intlUtils(intl, 'arbeidIUtlandet.tom')}
                                                    placeholder="dd.mm.åååå"
                                                    fullscreenOverlay={true}
                                                    showYearSelector={true}
                                                    validate={validateArbeidIUtlandetTom(
                                                        intl,
                                                        formValues.arbeidIUtlandet![index].fom,
                                                    )}
                                                    maxDate={dayjs().toDate()}
                                                    minDate={getMinInputTilOgMedValue(
                                                        formValues.arbeidIUtlandet![index].fom,
                                                        date4WeeksAgo,
                                                    )}
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
                                            {formValues.arbeidIUtlandet && formValues.arbeidIUtlandet.length > 1 && (
                                                <HorizontalLine />
                                            )}
                                            {formValues.arbeidIUtlandet &&
                                                index === formValues.arbeidIUtlandet.length - 1 && (
                                                    <Block padBottom="xl">
                                                        <Button
                                                            icon={<PlusIcon />}
                                                            type="button"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                arrayHelpers.push(getUferdigArbeidIUtlandetInput())
                                                            }
                                                        >
                                                            {intlUtils(intl, 'arbeidIUtlandet.tittel.ny')}
                                                        </Button>
                                                    </Block>
                                                )}
                                        </div>
                                    ))
                                }
                            />
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getBackLinkForArbeidIUtlandetSteg(søker)}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
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
