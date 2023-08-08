import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';

export interface SøknadsgrunnlagOption {
    value: string;
    type: Arbeidsforholdstype;
    label: string;
}

interface Props {
    label: string;
    options: SøknadsgrunnlagOption[];
}

const getSøknadsGrunnlagCheckbox = (value: string, label: string) => {
    return <Checkbox value={value}>{label}</Checkbox>;
};

export const VelgSøknadsgrunnlag: FunctionComponent<Props> = (props) => {
    const { label, options } = props;
    return (
        <CheckboxGroup legend={label}>
            {options.map((option) => getSøknadsGrunnlagCheckbox(option.value, option.label))}
        </CheckboxGroup>
    );
};

// export default VelgSøknadsgrunnlag;
