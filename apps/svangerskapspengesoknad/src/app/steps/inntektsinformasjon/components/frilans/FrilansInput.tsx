import { Block, ISOStringToDate, bemUtils, date4WeeksAgo, dateToday, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import { Button, ErrorMessage, Heading } from '@navikt/ds-react';
import { Frilans } from 'app/types/Frilans';
import { validateFrilansSlutt, validateFrilansStart, validatePågåendeOppdrag } from './validation/frilansValidation';
import { getIn } from 'formik';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import './frilans-input.css';
import { hasValue } from 'app/utils/validationUtils';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
    errors: any;
    setFieldValue: any;
}

const cleanValues = (formValues: InntektsinformasjonFormData, setFieldValue: any) => {
    if (formValues.jobberFremdelesSomFrilanser === YesOrNo.YES) {
        setFieldValue(InntektsinformasjonFormField.frilansSluttDato, '');
    }
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
    const [frilansOppstartFeil, setFrilansOppstartFeil] = useState<string | undefined>(undefined);
    const [frilansErPågåendeFeil, setFrilansErPågåendeFeil] = useState<string | undefined>(undefined);
    const [frilansSluttFeil, setFrilansSluttFeil] = useState<string | undefined>(undefined);

    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered =
            hasValue(formValues.frilansOppstartsDato) &&
            formValues.jobberFremdelesSomFrilanser !== YesOrNo.UNANSWERED &&
            (!visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato) ||
                hasValue(formValues.frilansSluttDato));
        const formIsValid =
            frilansOppstartFeil === undefined && frilansPågåendeError === undefined && frilansSluttFeil === undefined;
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
    const frilansPågåendeError = getIn(errors, InntektsinformasjonFormField.jobberFremdelesSomFrilanser);
    const frilansSluttError = getIn(errors, InntektsinformasjonFormField.frilansSluttDato);

    useEffect(() => {
        if (frilansOppstartError !== undefined) {
            setFrilansOppstartFeil(frilansOppstartError);
        } else {
            setFrilansOppstartFeil(undefined);
        }
        if (frilansPågåendeError !== undefined) {
            setFrilansErPågåendeFeil(frilansPågåendeError);
        } else {
            setFrilansErPågåendeFeil(undefined);
        }

        if (visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato) && frilansSluttError !== undefined) {
            setFrilansSluttFeil(frilansSluttError);
        } else {
            setFrilansSluttFeil(undefined);
        }
    }, [frilansOppstartError, frilansPågåendeError, frilansSluttError, visibility]);

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
                        validate={validateFrilansStart(intl, formValues.frilansSluttDato, submitClicked)}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                    />
                    {frilansOppstartFeil !== undefined && (
                        <div className={bem.element('feilmelding')}>
                            <ErrorMessage>{frilansOppstartFeil}</ErrorMessage>
                        </div>
                    )}
                    {submitClicked && !frilansOppstartFeil && !hasValue(formValues.frilansOppstartsDato) && (
                        <div className={bem.element('feilmelding')}>
                            <ErrorMessage>{intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd')}.</ErrorMessage>
                        </div>
                    )}
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.jobberFremdelesSomFrilanser}
                        legend={intlUtils(intl, 'inntektsinformasjon.frilans.jobberFremdelesSomFrilans')}
                        validate={validatePågåendeOppdrag(intl, submitClicked)}
                    />
                    {frilansErPågåendeFeil !== undefined && (
                        <div className={bem.element('feilmelding')}>
                            <ErrorMessage>{frilansErPågåendeFeil}</ErrorMessage>
                        </div>
                    )}
                    {submitClicked &&
                        !frilansErPågåendeFeil &&
                        formValues.jobberFremdelesSomFrilanser === YesOrNo.UNANSWERED && (
                            <div>
                                <ErrorMessage>
                                    {intlUtils(intl, 'valideringsfeil.frilansoppdrag.pågående.påkrevd')}
                                </ErrorMessage>
                            </div>
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
                            formValues.frilansOppstartsDato,
                            submitClicked
                        )}
                    />
                    {frilansSluttFeil !== undefined && (
                        <div className={bem.element('feilmelding')}>
                            <ErrorMessage>{frilansSluttFeil}</ErrorMessage>
                        </div>
                    )}
                    {submitClicked && !frilansSluttFeil && !hasValue(formValues.frilansSluttDato) && (
                        <ErrorMessage>{intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd')}</ErrorMessage>
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
