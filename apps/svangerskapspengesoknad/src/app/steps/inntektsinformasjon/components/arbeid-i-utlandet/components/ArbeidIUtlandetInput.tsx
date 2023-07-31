import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../../inntektsinformasjonFormConfig';
import './arbeid-i-utlandet-input.css';
import { Button, Heading } from '@navikt/ds-react';
import { Block, bemUtils, date4WeeksAgo, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { FunctionComponent, useEffect, useState } from 'react';
import { FormikErrors, getIn } from 'formik';
import { hasValue } from 'app/utils/validationUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getInputFeltFeil } from '../../input-feilmelding/InputFeilmelding';
import dayjs from 'dayjs';
import { validateArbeidIUtlandetFom, validateArbeidIUtlandetTom } from '../validation/arbeidIUtlandetValidation';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import {
    initialInntektsinformasjonFormValues,
    mapArbeidIUtlandetFormValuesToState,
} from '../../../inntektsinformasjonFormUtils';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    erFørsteInput: boolean;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const cleanValues = (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    setFieldValue(
        InntektsinformasjonFormField.arbeidIUtlandetLand,
        initialInntektsinformasjonFormValues.arbeidIUtlandetLand
    );
    setFieldValue(
        InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver,
        initialInntektsinformasjonFormValues.arbeidIUtlandetNavnArbeidsgiver
    );
    setFieldValue(
        InntektsinformasjonFormField.arbeidIUtlandetFom,
        initialInntektsinformasjonFormValues.arbeidIUtlandetFom
    );
    setFieldValue(
        InntektsinformasjonFormField.arbeidIUtlandetTom,
        initialInntektsinformasjonFormValues.arbeidIUtlandetTom
    );
    setFieldValue(
        InntektsinformasjonFormField.arbeidIUtlandetPågående,
        initialInntektsinformasjonFormValues.arbeidIUtlandetPågående
    );
};

const areAllArbeidIUtlandetQuestionsAnswered = (formValues: InntektsinformasjonFormData) => {
    return (
        hasValue(formValues.arbeidIUtlandetLand) &&
        hasValue(formValues.arbeidIUtlandetNavnArbeidsgiver) &&
        hasValue(formValues.arbeidIUtlandetFom) &&
        hasValue(formValues.arbeidIUtlandetPågående) &&
        (formValues.arbeidIUtlandetPågående === YesOrNo.YES || hasValue(formValues.arbeidIUtlandetTom))
    );
};

const ArbeidIUtlandetInput: FunctionComponent<Props> = ({
    visibility,
    formValues,
    setFieldValue,
    setSelectedAnnenInntekt,
    errors,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    erFørsteInput,
    setLeggTilNyttArbeidIUtlandet,
}) => {
    const tittelId = selectedAnnenInntekt
        ? 'inntektsinformasjon.arbeidIUtlandet.tittel.oppdater'
        : 'inntektsinformasjon.arbeidIUtlandet.tittel.ny';
    const submitButtonId = selectedAnnenInntekt ? 'oppdater' : 'leggTil';
    const intl = useIntl();
    const bem = bemUtils('arbeidIUtlandetInput');
    const [submitClicked, setSubmitClicked] = useState(false);
    const [navnFeil, setNavnFeil] = useState<string | undefined>(undefined);
    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [tomFeil, setTomFeil] = useState<string | undefined>(undefined);

    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = areAllArbeidIUtlandetQuestionsAnswered(formValues);
        const formIsValid = !navnFeil && !fomFeil && !tomFeil;

        if (formIsAnswered && formIsValid) {
            const arbeidIUtlandet = mapArbeidIUtlandetFormValuesToState(formValues);
            if (selectedAnnenInntekt) {
                editAnnenInntekt(selectedAnnenInntekt, arbeidIUtlandet);
            } else {
                addAnnenInntekt(arbeidIUtlandet);
            }
            cleanValues(setFieldValue);
            setSelectedAnnenInntekt(undefined);
        }
    };

    const handleOnAvbryt = () => {
        setSelectedAnnenInntekt(undefined);
        setLeggTilNyttArbeidIUtlandet(false);
    };
    const navnError = getIn(errors, InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver);
    const fomError = getIn(errors, InntektsinformasjonFormField.arbeidIUtlandetFom);
    const tomError = getIn(errors, InntektsinformasjonFormField.arbeidIUtlandetTom);

    useEffect(() => {
        if (navnError !== undefined) {
            setNavnFeil(navnError);
        } else {
            setNavnFeil(undefined);
        }

        if (fomError !== undefined) {
            setFomFeil(fomError);
        } else {
            setFomFeil(undefined);
        }
        if (tomError !== undefined) {
            setTomFeil(tomError);
        } else {
            setTomFeil(undefined);
        }
    }, [navnError, fomError, tomError]);
    const navnPåArbeidsgiverLabel = intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.navn');
    return (
        <>
            <div className={bem.block}>
                {!erFørsteInput && (
                    <Heading className={bem.element('tittel')} size="small" level="4">
                        {intlUtils(intl, tittelId)}
                    </Heading>
                )}
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetLand)}>
                    <InntektsinformasjonFormComponents.CountrySelect
                        name={InntektsinformasjonFormField.arbeidIUtlandetLand}
                        label={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.land')}
                        useAlpha3Code={false}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.arbeidIUtlandetLand,
                        formValues.arbeidIUtlandetLand,
                        intl
                    )}
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver)}
                >
                    <InntektsinformasjonFormComponents.TextField
                        name={InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver}
                        label={navnPåArbeidsgiverLabel}
                        validate={(val) => validateTextInputField(val, navnPåArbeidsgiverLabel, intl)}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver,
                        formValues.arbeidIUtlandetNavnArbeidsgiver,
                        intl,
                        navnError
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetFom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.arbeidIUtlandetFom}
                        label={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.fom')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateArbeidIUtlandetFom(intl, formValues.arbeidIUtlandetTom)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.arbeidIUtlandetFom,
                        formValues.arbeidIUtlandetFom,
                        intl,
                        fomError
                    )}
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetPågående)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.arbeidIUtlandetPågående}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.pågående')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.arbeidIUtlandetPågående,
                        formValues.arbeidIUtlandetPågående,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetTom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.arbeidIUtlandetTom}
                        label={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.tom')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateArbeidIUtlandetTom(intl, formValues.arbeidIUtlandetFom)}
                        maxDate={dayjs().toDate()}
                        minDate={dayjs.max(dayjs(date4WeeksAgo), dayjs(formValues.arbeidIUtlandetFom)).toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.arbeidIUtlandetTom,
                        formValues.arbeidIUtlandetTom,
                        intl,
                        tomError
                    )}
                </Block>
                <Button
                    type="button"
                    variant="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        handleOnLeggTil();
                    }}
                >
                    <FormattedMessage id={submitButtonId} />
                </Button>
                {!erFørsteInput && (
                    <Button
                        className={bem.element('avbryt')}
                        type="button"
                        variant="secondary"
                        onClick={handleOnAvbryt}
                    >
                        <FormattedMessage id="avbryt" />
                    </Button>
                )}
            </div>
        </>
    );
};

export default ArbeidIUtlandetInput;
