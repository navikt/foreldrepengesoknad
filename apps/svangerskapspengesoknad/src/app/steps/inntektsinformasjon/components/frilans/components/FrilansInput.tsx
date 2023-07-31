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

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const cleanValues = (
    formValues: InntektsinformasjonFormData,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
) => {
    if (formValues.jobberFremdelesSomFrilanser === YesOrNo.YES) {
        setFieldValue(InntektsinformasjonFormField.frilansSluttDato, '');
    }
};

const areAllFrilansQuestionsAnswered = (formValues: InntektsinformasjonFormData) => {
    return (
        hasValue(formValues.frilansOppstartsDato) &&
        hasValue(formValues.jobberFremdelesSomFrilanser) &&
        (formValues.jobberFremdelesSomFrilanser === YesOrNo.YES || hasValue(formValues.frilansOppstartsDato))
    );
};

const FrilansInput: FunctionComponent<Props> = ({
    visibility,
    formValues,
    errors,
    setFrilans,
    setRedigererFrilans,
    setFieldValue,
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
                oppstart: ISOStringToDate(formValues.frilansOppstartsDato)!,
                sluttDato: ISOStringToDate(formValues.frilansSluttDato)!,
            };
            cleanValues(formValues, setFieldValue);
            setFrilans(frilansInfo);
            setRedigererFrilans(false);
        }
    };

    const frilansOppstartError = getIn(errors, InntektsinformasjonFormField.frilansOppstartsDato);
    const frilansSluttError = getIn(errors, InntektsinformasjonFormField.frilansSluttDato);

    useEffect(() => {
        if (frilansOppstartError !== undefined) {
            setFomFeil(frilansOppstartError);
        } else {
            setFomFeil(undefined);
        }
        if (frilansSluttError !== undefined) {
            setTomFeil(frilansSluttError);
        } else {
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
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansOppstartsDato)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansOppstartsDato}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.oppstart')}
                        validate={validateFrilansStart(intl, formValues.frilansSluttDato)}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.frilansOppstartsDato,
                        formValues.frilansOppstartsDato,
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
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansSluttDato}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.slutt')}
                        minDate={date4WeeksAgo}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                        validate={validateFrilansSlutt(
                            intl,
                            formValues.jobberFremdelesSomFrilanser,
                            formValues.frilansOppstartsDato
                            // submitClicked
                        )}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.frilansSluttDato,
                        formValues.frilansSluttDato,
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
