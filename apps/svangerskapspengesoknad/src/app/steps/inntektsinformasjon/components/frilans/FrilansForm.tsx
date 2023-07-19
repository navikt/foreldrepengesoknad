import { Block, ISOStringToDate, bemUtils, dateToday, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrilansForm: FunctionComponent<Props> = ({ visibility, formValues, setFrilans, setRedigererFrilans }) => {
    const intl = useIntl();
    const bem = bemUtils('frilansForm');
    const handleOnLeggTil = () => {
        const formIsValid = true; //TODO: run validation checks on formvalue props
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
                    />
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

export default FrilansForm;
