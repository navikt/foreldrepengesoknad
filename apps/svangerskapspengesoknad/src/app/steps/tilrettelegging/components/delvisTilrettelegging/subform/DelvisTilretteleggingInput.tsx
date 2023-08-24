import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    DelvisTilretteleggingSubformComponents,
    DelvisTilretteleggingSubformData,
    DelvisTilretteleggingSubformField,
} from './delvisTilretteleggingSubformConfig';
import { FormikErrors, getIn } from 'formik';
import { mapTilrettelegging } from './delvisTilretteleggingSubformUtils';
import { Button } from '@navikt/ds-react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { TilretteleggingInput, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { getInputFeltFeil } from 'app/steps/inntektsinformasjon/components/input-feilmelding/InputFeilmelding';
import './delvis-tilrettelegging-input.css';

interface Props {
    formValues: Partial<DelvisTilretteleggingSubformData>;
    erFørsteInput: boolean;
    errors: FormikErrors<Partial<DelvisTilretteleggingSubformData>>;
    selectedDelvisTilrettelegging: TilretteleggingInput | undefined;
    visibility: QuestionVisibility<DelvisTilretteleggingSubformField>;
    setSelectedDelvisTilrettelegging: React.Dispatch<React.SetStateAction<TilretteleggingInput | undefined>>;
    addDelvisTilrettelegging: (inntekt: TilretteleggingInput) => void;
    editDelvisTilrettelegging: (
        inntektSomEditeres: TilretteleggingInput,
        oppdatertInntekt: TilretteleggingInput
    ) => void;
    setLeggTilNyttDelvisTilrettelegging: React.Dispatch<React.SetStateAction<boolean>>;
}
const DelvisTilretteleggingInput: FunctionComponent<Props> = ({
    formValues,
    errors,
    selectedDelvisTilrettelegging,
    erFørsteInput,
    visibility,
    setSelectedDelvisTilrettelegging,
    addDelvisTilrettelegging,
    editDelvisTilrettelegging,
    setLeggTilNyttDelvisTilrettelegging,
}) => {
    const submitButtonId = selectedDelvisTilrettelegging ? 'oppdater' : 'leggTil';
    const intl = useIntl();
    const bem = bemUtils('delvisTilretteleggingInput');
    const [submitClicked, setSubmitClicked] = useState(false);

    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [stillingsprosentFeil, setStillingsprosentFeil] = useState<string | undefined>(undefined);

    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = visibility.areAllQuestionsAnswered();
        const formIsValid = !fomFeil && !stillingsprosentFeil;

        if (formIsAnswered && formIsValid) {
            if (selectedDelvisTilrettelegging) {
                const delvisTilrettelegging = mapTilrettelegging(formValues);
                editDelvisTilrettelegging(selectedDelvisTilrettelegging, delvisTilrettelegging);
            } else {
                const delvisTilrettelegging = mapTilrettelegging(formValues);
                addDelvisTilrettelegging(delvisTilrettelegging);
            }
            setSelectedDelvisTilrettelegging(undefined);
        }
    };

    const handleOnAvbryt = () => {
        setSelectedDelvisTilrettelegging(undefined);
        setLeggTilNyttDelvisTilrettelegging(false);
    };
    const fomError = getIn(errors, DelvisTilretteleggingSubformField.fom);
    const stillingsprosentError = getIn(errors, DelvisTilretteleggingSubformField.stillingsprosent);

    useEffect(() => {
        if (fomError !== undefined) {
            setFomFeil(fomError);
        } else {
            setFomFeil(undefined);
        }

        if (stillingsprosentError !== undefined) {
            setStillingsprosentFeil(stillingsprosentError);
        } else {
            setStillingsprosentFeil(undefined);
        }
    }, [fomError, stillingsprosentError]);
    return (
        <>
            <div className={bem.block}>
                <Block padBottom="xl">
                    <DelvisTilretteleggingSubformComponents.RadioGroup
                        name={DelvisTilretteleggingSubformField.type}
                        legend={intlUtils(intl, 'tilrettelegging.tilretteleggingsType.label')}
                        radios={[
                            {
                                label: intlUtils(intl, 'tilrettelegging.tilretteleggingsType.delvis'),
                                value: Tilretteleggingstype.DELVIS,
                            },
                            {
                                label: intlUtils(intl, 'tilrettelegging.tilretteleggingsType.ingen'),
                                value: Tilretteleggingstype.HEL,
                            },
                        ]}
                    />
                </Block>
                <Block padBottom="l">
                    <DelvisTilretteleggingSubformComponents.DatePicker
                        name={DelvisTilretteleggingSubformField.fom}
                        label={intlUtils(intl, 'tilrettelegging.delvisTilrettelegging.fom')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        // validate={validateDelvisTilretteleggingFom(intl)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        DelvisTilretteleggingSubformField.fom,
                        formValues.fom,
                        intl,
                        fomError
                    )}
                </Block>
                <Block padBottom="l">
                    <DelvisTilretteleggingSubformComponents.NumberInput
                        name={DelvisTilretteleggingSubformField.stillingsprosent}
                        label={intlUtils(intl, 'tilrettelegging.delvisTilrettelegging.stillingsprosent')}
                        // {validateNumber(intl, 'valideringsfeil.næringsinntekt.ugyldigFormat')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        DelvisTilretteleggingSubformField.stillingsprosent,
                        formValues.stillingsprosent,
                        intl
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

export default DelvisTilretteleggingInput;
