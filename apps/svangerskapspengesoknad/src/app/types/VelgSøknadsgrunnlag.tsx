import { intlUtils } from '@navikt/fp-common';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormField,
} from 'app/steps/inntektsinformasjon/inntektsinformasjonFormConfig';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';
import { IntlShape } from 'react-intl';

export interface SøknadsgrunnlagOption {
    value: string;
    type: Arbeidsforholdstype;
    label: string;
}

interface Props {
    label: string;
    options: SøknadsgrunnlagOption[];
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
            checkboxes={options.map((option) => ({ label: option.label, value: option.value }))}
            validate={(value) => validateTilretteleggingIsAnswered(value, intl)}
        />
    );
};
