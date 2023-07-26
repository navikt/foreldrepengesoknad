import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringOrgnr } from '../validation/egenNæringValidation';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from 'app/steps/inntektsinformasjon/inntektsinformasjonFormConfig';
import { getInputFeltFeil } from '../../../input-feilmelding/InputFeilmelding';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    orgNrFeil: string | undefined;
    submitClicked: boolean;
    formValues: InntektsinformasjonFormData;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ visibility, orgNrFeil, submitClicked, formValues }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringOrgnr)}>
                <InntektsinformasjonFormComponents.NumberInput
                    name={InntektsinformasjonFormField.egenNæringOrgnr}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæring.orgnr')}
                    validate={validateEgenNæringOrgnr(intl)}
                />
                {getInputFeltFeil(
                    submitClicked,
                    InntektsinformasjonFormField.egenNæringOrgnr,
                    formValues.egenNæringOrgnr,
                    intl,
                    orgNrFeil
                )}
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringLand)}>
                <InntektsinformasjonFormComponents.CountrySelect
                    name={InntektsinformasjonFormField.egenNæringLand}
                    label={intlUtils(intl, 'inntektsinformasjon.egenNæring.registrertILand')}
                    useAlpha3Code={false}
                />
                {getInputFeltFeil(
                    submitClicked,
                    InntektsinformasjonFormField.egenNæringLand,
                    formValues.egenNæringLand,
                    intl
                )}
            </Block>
        </>
    );
};

export default OrgnummerEllerLand;
