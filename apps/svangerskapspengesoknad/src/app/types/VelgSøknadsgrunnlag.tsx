import { intlUtils } from '@navikt/fp-common';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormField,
} from 'app/steps/inntektsinformasjon/inntektsinformasjonFormConfig';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';
import { IntlShape } from 'react-intl';

interface Props {
    label: string;
    options: Tilrettelegging[];
    intl: IntlShape;
}

const validateTilretteleggingIsAnswered = (value: string, intl: IntlShape) => {
    if (value.length === 0) {
        return intlUtils(intl, 'valideringsfeil.tilrettelegging.påkrevd');
    }
    return undefined;
};

export const VelgSøknadsgrunnlag: FunctionComponent<Props> = (props) => {
    const { label, options, intl } = props;
    return (
        <InntektsinformasjonFormComponents.CheckboxGroup
            name={InntektsinformasjonFormField.tilrettelegging}
            legend={label}
            checkboxes={options.map((option) => ({ label: option.arbeidsforhold.navn, value: option.id }))}
            validate={(value) => validateTilretteleggingIsAnswered(value, intl)}
        />
    );
};
