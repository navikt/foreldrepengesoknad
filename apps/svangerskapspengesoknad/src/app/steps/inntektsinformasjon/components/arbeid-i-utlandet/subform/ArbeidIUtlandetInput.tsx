import { FormattedMessage, useIntl } from 'react-intl';
import { getInputFeltFeil } from '../../input-feilmelding/InputFeilmelding';
import dayjs from 'dayjs';
import { Block, bemUtils, date4WeeksAgo, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    ArbeidIUtlandetSubformComponents,
    ArbeidIUtlandetSubformData,
    ArbeidIUtlandetSubformField,
} from './arbeidIUtlandetSubformConfig';
import { FormikErrors, getIn } from 'formik';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { mapArbeidIUtlandet } from './arbeidIUtlandetSubformUtils';
import { Button, Heading } from '@navikt/ds-react';
import { validateArbeidIUtlandetFom, validateArbeidIUtlandetTom } from '../validation/arbeidIUtlandetValidation';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';

interface Props {
    formValues: Partial<ArbeidIUtlandetSubformData>;
    erFørsteInput: boolean;
    errors: FormikErrors<Partial<ArbeidIUtlandetSubformData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    visibility: QuestionVisibility<ArbeidIUtlandetSubformField>;
    allArbeidIUtlandet: ArbeidIUtlandet[];
    validateForm: any;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArbeidIUtlandetInput: FunctionComponent<Props> = ({
    formValues,
    errors,
    selectedAnnenInntekt,
    erFørsteInput,
    visibility,
    allArbeidIUtlandet,
    validateForm,
    setSelectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
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
        const formIsAnswered = visibility.areAllQuestionsAnswered();
        const formIsValid = !navnFeil && !fomFeil && !tomFeil;

        if (formIsAnswered && formIsValid) {
            if (selectedAnnenInntekt) {
                const arbeidIUtlandet = mapArbeidIUtlandet(formValues, selectedAnnenInntekt.id);
                editAnnenInntekt(selectedAnnenInntekt, arbeidIUtlandet);
            } else {
                const arbeidIUtlandet = mapArbeidIUtlandet(formValues, allArbeidIUtlandet.length);
                addAnnenInntekt(arbeidIUtlandet);
            }
            setSelectedAnnenInntekt(undefined);
        }
    };

    const handleOnAvbryt = () => {
        setSelectedAnnenInntekt(undefined);
        setLeggTilNyttArbeidIUtlandet(false);
    };
    const navnError = getIn(errors, ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver);
    const fomError = getIn(errors, ArbeidIUtlandetSubformField.arbeidIUtlandetFom);
    const tomError = getIn(errors, ArbeidIUtlandetSubformField.arbeidIUtlandetTom);

    useEffect(() => {
        if (navnError !== undefined) {
            setNavnFeil(navnError);
        } else {
            setNavnFeil(undefined);
        }

        if (fomError !== undefined) {
            setFomFeil(fomError);
        } else {
            validateForm();
            setFomFeil(undefined);
        }
        if (tomError !== undefined) {
            setTomFeil(tomError);
        } else {
            validateForm();
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
                <Block padBottom="l">
                    <ArbeidIUtlandetSubformComponents.CountrySelect
                        name={ArbeidIUtlandetSubformField.arbeidIUtlandetLand}
                        label={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.land')}
                        useAlpha3Code={false}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        ArbeidIUtlandetSubformField.arbeidIUtlandetLand,
                        formValues.arbeidIUtlandetLand,
                        intl
                    )}
                </Block>
                <Block padBottom="l">
                    <ArbeidIUtlandetSubformComponents.TextField
                        name={ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver}
                        label={navnPåArbeidsgiverLabel}
                        validate={(val) => validateTextInputField(val, navnPåArbeidsgiverLabel, intl)}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver,
                        formValues.arbeidIUtlandetNavnArbeidsgiver,
                        intl,
                        navnError
                    )}
                </Block>
                <Block padBottom="l">
                    <ArbeidIUtlandetSubformComponents.DatePicker
                        name={ArbeidIUtlandetSubformField.arbeidIUtlandetFom}
                        label={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.fom')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateArbeidIUtlandetFom(intl, formValues.arbeidIUtlandetTom)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        ArbeidIUtlandetSubformField.arbeidIUtlandetFom,
                        formValues.arbeidIUtlandetFom,
                        intl,
                        fomError
                    )}
                </Block>
                <Block padBottom="l">
                    <ArbeidIUtlandetSubformComponents.YesOrNoQuestion
                        name={ArbeidIUtlandetSubformField.arbeidIUtlandetErPågående}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.pågående')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        ArbeidIUtlandetSubformField.arbeidIUtlandetErPågående,
                        formValues.arbeidIUtlandetErPågående,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(ArbeidIUtlandetSubformField.arbeidIUtlandetTom)}>
                    <ArbeidIUtlandetSubformComponents.DatePicker
                        name={ArbeidIUtlandetSubformField.arbeidIUtlandetTom}
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
                        ArbeidIUtlandetSubformField.arbeidIUtlandetTom,
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
