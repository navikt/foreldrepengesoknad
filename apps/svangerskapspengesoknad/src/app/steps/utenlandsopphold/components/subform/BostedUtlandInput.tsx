import { BostedUtland } from 'app/types/BostedUtland';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    mapBostedUtland,
    validateBostedUtlandFom,
    validateBostedUtlandTom,
    validerOverlappendeUtenlandsperioder,
} from './bostedUtlandSubformUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, bemUtils, dateToday, intlUtils } from '@navikt/fp-common';
import { Button, Heading } from '@navikt/ds-react';
import {
    BostedUtlandSubformComponents,
    BostedUtlandSubformData,
    BostedUtlandSubformField,
} from './bostedUtlandSubformConfig';
import InputFeilmelding, {
    getInputFeltFeil,
} from 'app/steps/inntektsinformasjon/components/input-feilmelding/InputFeilmelding';
import { FormikErrors, getIn } from 'formik';
import './bosted-utland-subform.css';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { getMinInputTilOgMedValue, hasValue } from 'app/utils/validationUtils';

const getMinValueTomInput = (oppgirIFortid: boolean, fom: string | undefined, datobegrensning: Date) => {
    if (oppgirIFortid) {
        return fom && hasValue(fom) ? new Date(fom) : undefined;
    }
    return getMinInputTilOgMedValue(fom, datobegrensning);
};

interface Props {
    currentOppholdId: number | undefined;
    selectedOpphold: BostedUtland | undefined;
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    formValues: Partial<BostedUtlandSubformData>;
    errors: FormikErrors<Partial<BostedUtlandSubformData>>;
    visibility: QuestionVisibility<BostedUtlandSubformField>;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    addOpphold: (inntekt: BostedUtland) => void;
    editOpphold: (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => void;
    setLeggerTilNyttOppholdIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    validateForm: any;
}
const BostedUtlandInput: FunctionComponent<Props> = ({
    currentOppholdId,
    oppgirIFortid,
    alleOpphold,
    selectedOpphold,
    errors,
    formValues,
    validateForm,
    visibility,
    setSelectedOpphold,
    addOpphold,
    editOpphold,
    setLeggerTilNyttOppholdIUtlandet,
}) => {
    const bem = bemUtils('bostedUtlandSubform');
    const intl = useIntl();
    const [overlappendePerioderFeil, setOverlappendePerioderFeil] = useState<string | undefined>(undefined);
    const erFørsteInput = alleOpphold.length === 0;
    const tittelId = selectedOpphold
        ? 'inntektsinformasjon.arbeidIUtlandet.tittel.oppdater'
        : 'inntektsinformasjon.arbeidIUtlandet.tittel.ny';
    const submitButtonId = selectedOpphold ? 'oppdater' : 'leggTil';

    const handleOnSubmit = (values: Partial<BostedUtlandSubformData>, event: any) => {
        event.preventDefault();
        const formIsAnswered = visibility.areAllQuestionsAnswered();
        const formIsValid = !fomFeil && !tomFeil;
        const overlappendePerioderTekst = validerOverlappendeUtenlandsperioder(
            alleOpphold,
            formValues.fom,
            formValues.tom,
            intl,
            currentOppholdId
        );
        setOverlappendePerioderFeil(overlappendePerioderTekst);
        if (formIsAnswered && formIsValid && !overlappendePerioderTekst) {
            if (selectedOpphold) {
                const nyttOpphold = mapBostedUtland(values, selectedOpphold.id);
                editOpphold(selectedOpphold, nyttOpphold);
            } else {
                const nyttOpphold = mapBostedUtland(values, alleOpphold.length);
                addOpphold(nyttOpphold);
            }
            setSelectedOpphold(undefined);
        }
        setSubmitClicked(true);
    };

    const handleOnAvbryt = () => {
        setSelectedOpphold(undefined);
        setLeggerTilNyttOppholdIUtlandet(false);
    };
    const spmId = oppgirIFortid
        ? 'utenlandsopphold.spørsmål.hvilketLandHarDuBoddI'
        : 'utenlandsopphold.spørsmål.hvilketLandSkalDuBoI';

    const [submitClicked, setSubmitClicked] = useState(false);
    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [tomFeil, setTomFeil] = useState<string | undefined>(undefined);
    const fomError = getIn(errors, BostedUtlandSubformField.fom);
    const tomError = getIn(errors, BostedUtlandSubformField.tom);

    useEffect(() => {
        if (fomError !== undefined) {
            setFomFeil(fomError);
        } else {
            setFomFeil(undefined);
            validateForm();
        }
        if (tomError !== undefined) {
            setTomFeil(tomError);
        } else {
            validateForm();
            setTomFeil(undefined);
        }
    }, [fomError, tomError]);

    return (
        <div className={bem.block}>
            {!erFørsteInput && (
                <Heading className={bem.element('tittel')} size="small" level="4">
                    {intlUtils(intl, tittelId)}
                </Heading>
            )}
            <Block padBottom="l">
                <BostedUtlandSubformComponents.CountrySelect
                    name={BostedUtlandSubformField.land}
                    label={intlUtils(intl, spmId)}
                />
                {getInputFeltFeil(submitClicked, BostedUtlandSubformField.land, formValues.land, intl)}
            </Block>
            <Block padBottom="l">
                <BostedUtlandSubformComponents.DatePicker
                    name={BostedUtlandSubformField.fom}
                    label={intlUtils(intl, 'utenlandsopphold.fraogmed')}
                    validate={validateBostedUtlandFom(formValues.tom, oppgirIFortid, intl)}
                    maxDate={oppgirIFortid ? dateToday : undefined}
                    minDate={!oppgirIFortid ? dateToday : undefined}
                    showYearSelector={true}
                    placeholder={'dd.mm.åååå'}
                />
                {getInputFeltFeil(submitClicked, BostedUtlandSubformField.fom, formValues.fom, intl, fomFeil)}
            </Block>
            <Block padBottom="l">
                <BostedUtlandSubformComponents.DatePicker
                    name={BostedUtlandSubformField.tom}
                    label={intlUtils(intl, 'utenlandsopphold.tilogmed')}
                    validate={validateBostedUtlandTom(formValues.fom, oppgirIFortid, intl)}
                    maxDate={oppgirIFortid ? dateToday : undefined}
                    minDate={getMinValueTomInput(oppgirIFortid, formValues.fom, dateToday)}
                    showYearSelector={true}
                    placeholder={'dd.mm.åååå'}
                />
                {getInputFeltFeil(submitClicked, BostedUtlandSubformField.tom, formValues.tom, intl, tomFeil)}
            </Block>
            {overlappendePerioderFeil && <InputFeilmelding feilmelding={overlappendePerioderFeil} />}
            <Block margin="xl">
                <Button variant="primary" onClick={(event) => handleOnSubmit(formValues, event)}>
                    <FormattedMessage id={submitButtonId} />
                </Button>

                {!erFørsteInput && (
                    <Button className={bem.element('avbryt')} variant="secondary" onClick={handleOnAvbryt}>
                        <FormattedMessage id="avbryt" />
                    </Button>
                )}
            </Block>
        </div>
    );
};

export default BostedUtlandInput;
