import { Block, ISOStringToDate, bemUtils, date4WeeksAgo, dateToday, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../../inntektsinformasjonFormConfig';
import { Button, Heading } from '@navikt/ds-react';
import { Frilans } from 'app/types/Frilans';
import { validateFrilansSlutt, validateFrilansStart } from '../validation/frilansValidation';
import { FormikErrors, getIn } from 'formik';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import './frilans-input.css';
import { hasValue } from 'app/utils/validationUtils';
import { getInputFeltFeil } from '../../input-feilmelding/InputFeilmelding';
import dayjs from 'dayjs';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    validateForm: any; //Promise<FormikErrors<Partial<InntektsinformasjonFormData>>>
}

const cleanValues = (
    formValues: InntektsinformasjonFormData,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
) => {
    if (formValues.jobberFremdelesSomFrilanser === YesOrNo.YES) {
        setFieldValue(InntektsinformasjonFormField.frilansTom, '');
    }
};

const areAllFrilansQuestionsAnswered = (formValues: InntektsinformasjonFormData) => {
    return (
        hasValue(formValues.frilansFom) &&
        hasValue(formValues.jobberFremdelesSomFrilanser) &&
        (formValues.jobberFremdelesSomFrilanser === YesOrNo.YES || hasValue(formValues.frilansFom))
    );
};

const FrilansInput: FunctionComponent<Props> = ({
    visibility,
    formValues,
    errors,
    setFrilans,
    setRedigererFrilans,
    setFieldValue,
    validateForm,
}) => {
    const intl = useIntl();
    const bem = bemUtils('frilansInput');
    const [submitClicked, setSubmitClicked] = useState(false);
    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [tomFeil, setTomFeil] = useState<string | undefined>(undefined);

    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = areAllFrilansQuestionsAnswered(formValues);
        const formIsValid = fomFeil === undefined && tomFeil === undefined;
        if (formIsAnswered && formIsValid) {
            const frilansInfo = {
                jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(formValues.jobberFremdelesSomFrilanser),
                oppstart: ISOStringToDate(formValues.frilansFom)!,
                sluttDato: ISOStringToDate(formValues.frilansTom)!,
            };
            cleanValues(formValues, setFieldValue);
            setFrilans(frilansInfo);
            setRedigererFrilans(false);
        }
    };

    const frilansOppstartError = getIn(errors, InntektsinformasjonFormField.frilansFom);
    const frilansSluttError = getIn(errors, InntektsinformasjonFormField.frilansTom);

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
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.frilansArbeid.tittel')}
                </Heading>
            </Block>
            <div className={bem.block}>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansFom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansFom}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.oppstart')}
                        validate={validateFrilansStart(intl, formValues.frilansTom)}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.frilansFom,
                        formValues.frilansFom,
                        intl,
                        fomFeil
                    )}
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.jobberFremdelesSomFrilanser}
                        legend={intlUtils(intl, 'inntektsinformasjon.frilans.jobberFremdelesSomFrilans')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.jobberFremdelesSomFrilanser,
                        formValues.jobberFremdelesSomFrilanser,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansTom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansTom}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.slutt')}
                        minDate={dayjs.max(dayjs(date4WeeksAgo), dayjs(formValues.frilansFom)).toDate()}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                        validate={validateFrilansSlutt(
                            intl,
                            formValues.jobberFremdelesSomFrilanser,
                            formValues.frilansFom
                        )}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.frilansTom,
                        formValues.frilansTom,
                        intl,
                        tomFeil
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
                    <FormattedMessage id="leggTil" />
                </Button>
            </div>
        </>
    );
};

export default FrilansInput;
