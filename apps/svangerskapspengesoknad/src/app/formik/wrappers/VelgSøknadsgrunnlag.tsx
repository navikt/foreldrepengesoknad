import { FunctionComponent } from 'react';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import CheckboksPanelGruppe from './CheckboksPanelGruppe';

export interface SøknadsgrunnlagOption {
    value: string;
    type: Arbeidsforholdstype;
    label: string;
}

interface OwnProps {
    name: string;
    label: string;
    options: SøknadsgrunnlagOption[];
}

const VelgSøknadsgrunnlag: FunctionComponent<OwnProps> = (props) => {
    const { name, label, options } = props;
    return (
        <CheckboksPanelGruppe
            name={name}
            label={label}
            options={options.map((option) => ({
                value: option.value,
                label: option.label,
            }))}
        />
    );
};

export default VelgSøknadsgrunnlag;
