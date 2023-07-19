import {
    Block,
    ISOStringToDate,
    bemUtils,
    dateToday,
    hasValue,
    intlUtils,
    isDateABeforeDateB,
    isDateInTheFuture,
} from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import './frilans-form.css';
import { Button } from '@navikt/ds-react';
import { Frilans } from 'app/types/Frilans';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { validateFrilansSlutt, validateFrilansStart, validatePågåendeOppdrag } from './validation/frilansValidation';
import { isISODateString } from '@navikt/ds-datepicker';
interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
    setFrilansStartFeil: React.Dispatch<React.SetStateAction<string | undefined>>;
    frilansStartFeil: string | undefined;
}

export const validateFrilansStartInput = (fom: string, intl: IntlShape, tom: string | undefined) => {
    if (!hasValue(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
    }

    if (!isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    if (tom && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    }

    return undefined;
};

const FrilansForm: FunctionComponent<Props> = ({
    visibility,
    formValues,
    setFrilans,
    setRedigererFrilans,
    frilansStartFeil,
    setFrilansStartFeil,
}) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const intl = useIntl();
    const bem = bemUtils('frilansForm');
    const handleOnLeggTil = () => {
        if (formIsValid) {
            const frilansInfo = {
                jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(formValues.jobberFremdelesSomFrilanser),
                oppstart: ISOStringToDate(formValues.frilansOppstartsDato)!,
                sluttDato: ISOStringToDate(formValues.frilansSluttDato)!,
            };
            setFrilans(frilansInfo);
            setRedigererFrilans(false);
            console.log('Alt ok');
        } else {
            console.log('TODO-valideringsfeil');
        }
    };

    const handleOnChange = () => {
        const startValidering = validateFrilansStartInput(
            formValues.frilansOppstartsDato,
            intl,
            formValues.frilansSluttDato
        );
        if (startValidering) {
            setFrilansStartFeil(startValidering);
            setFormIsValid(false);
        } else {
            setFrilansStartFeil(undefined);
            setFormIsValid(true);
        }
    };

    return (
        <>
            <div className={bem.block}>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansOppstartsDato)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansOppstartsDato}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.oppstart')}
                        validate={validateFrilansStart(intl, formValues.frilansSluttDato)}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                        error={frilansStartFeil}
                        onChange={handleOnChange}
                    />
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.jobberFremdelesSomFrilanser}
                        legend={intlUtils(intl, 'inntektsinformasjon.frilans.jobberFremdelesSomFrilans')}
                        validate={validatePågåendeOppdrag(intl)}
                        onClick={handleOnChange}
                    />
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.frilansSluttDato}
                        label={intlUtils(intl, 'inntektsinformasjon.frilans.slutt')}
                        validate={validateFrilansSlutt(
                            intl,
                            formValues.jobberFremdelesSomFrilanser,
                            formValues.frilansOppstartsDato
                        )}
                        maxDate={dateToday}
                        showYearSelector={true}
                        placeholder={'dd.mm.åååå'}
                        error={'geeeil'}
                        onChange={handleOnChange}
                    />
                </Block>
                <Button
                    type="button"
                    variant="secondary"
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

export default FrilansForm;
