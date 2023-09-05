import {
    Block,
    ISOStringToDate,
    bemUtils,
    dateToday,
    intlUtils,
    date4WeeksAgo,
    date20YearsAgo,
} from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { Frilans } from 'app/types/Frilans';
import { FormikErrors, getIn } from 'formik';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import './frilans-input.css';
import { FrilansSubformComponents, FrilansSubformData, FrilansSubformField } from './frilansSubformConfig';
import { validateFrilansSlutt, validateFrilansStart } from '../validation/frilansValidation';
import { getInputFeltFeil } from '../../input-feilmelding/InputFeilmelding';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';

interface Props {
    frilans: Frilans | undefined;
    visibility: QuestionVisibility<FrilansSubformField, undefined>;
    formValues: Partial<FrilansSubformData>;
    errors: FormikErrors<Partial<FrilansSubformData>>;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
    validateForm: any; //Promise<FormikErrors<Partial<InntektsinformasjonFormData>>>
}

const FrilansInput: FunctionComponent<Props> = ({
    frilans,
    visibility,
    formValues,
    errors,
    setFrilans,
    setRedigererFrilans,
    validateForm,
}) => {
    const intl = useIntl();
    const bem = bemUtils('frilansInput');
    const [submitClicked, setSubmitClicked] = useState(false);
    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [tomFeil, setTomFeil] = useState<string | undefined>(undefined);
    const submitButtonId = frilans ? 'oppdater' : 'leggTil';
    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = visibility.areAllQuestionsAnswered();
        const formIsValid = fomFeil === undefined && tomFeil === undefined;
        if (formIsAnswered && formIsValid) {
            const frilansInfo = {
                jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(formValues.jobberFremdelesSomFrilanser),
                oppstart: ISOStringToDate(formValues.frilansFom)!,
                sluttDato: ISOStringToDate(formValues.frilansTom)!,
            };
            setFrilans(frilansInfo);
            setRedigererFrilans(false);
        }
    };

    const frilansOppstartError = getIn(errors, FrilansSubformField.frilansFom);
    const frilansSluttError = getIn(errors, FrilansSubformField.frilansTom);

    useEffect(() => {
        if (frilansOppstartError !== undefined) {
            setFomFeil(frilansOppstartError);
        } else {
            //TODO Kan dette gjøres annerledes?
            // Må validere formen på nytt hvis ingen feil, for å unngå at validering kalles med gamle verdier på fom/tom.
            validateForm();
            setFomFeil(undefined);
        }
        if (frilansSluttError !== undefined) {
            setTomFeil(frilansSluttError);
        } else {
            validateForm();
            setTomFeil(undefined);
        }
    }, [frilansOppstartError, frilansSluttError]);

    return (
        <div className={bem.block}>
            <Block padBottom="l" visible={visibility.isVisible(FrilansSubformField.frilansFom)}>
                <FrilansSubformComponents.DatePicker
                    name={FrilansSubformField.frilansFom}
                    label={intlUtils(intl, 'inntektsinformasjon.frilans.oppstart')}
                    validate={validateFrilansStart(intl, formValues.frilansTom!)}
                    maxDate={dateToday}
                    minDate={date20YearsAgo}
                    showYearSelector={true}
                    placeholder={'dd.mm.åååå'}
                />
                {getInputFeltFeil(submitClicked, FrilansSubformField.frilansFom, formValues.frilansFom, intl, fomFeil)}
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(FrilansSubformField.jobberFremdelesSomFrilanser)}>
                <FrilansSubformComponents.YesOrNoQuestion
                    name={FrilansSubformField.jobberFremdelesSomFrilanser}
                    legend={intlUtils(intl, 'inntektsinformasjon.frilans.jobberFremdelesSomFrilans')}
                />
                {getInputFeltFeil(
                    submitClicked,
                    FrilansSubformField.jobberFremdelesSomFrilanser,
                    formValues.jobberFremdelesSomFrilanser,
                    intl
                )}
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(FrilansSubformField.frilansTom)}>
                <FrilansSubformComponents.DatePicker
                    name={FrilansSubformField.frilansTom}
                    label={intlUtils(intl, 'inntektsinformasjon.frilans.slutt')}
                    minDate={getMinInputTilOgMedValue(formValues.frilansFom, date4WeeksAgo)}
                    maxDate={dateToday}
                    showYearSelector={true}
                    placeholder={'dd.mm.åååå'}
                    validate={validateFrilansSlutt(
                        intl,
                        formValues.jobberFremdelesSomFrilanser!,
                        formValues.frilansFom!
                    )}
                />
                {getInputFeltFeil(submitClicked, FrilansSubformField.frilansTom, formValues.frilansTom, intl, tomFeil)}
            </Block>
            <Button type="button" variant="primary" onClick={handleOnLeggTil}>
                <FormattedMessage id={submitButtonId} />
            </Button>
        </div>
    );
};

export default FrilansInput;
