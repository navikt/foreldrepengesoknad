import * as React from 'react';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import DatoInput from 'common/components/dato-input/DatoInput';
import { Fødselsdato } from '../types/common';

export interface Props {
    fødselsdatoer: Fødselsdato[];
    onChange: (fødselsdatoer: Fødselsdato[]) => void;
}

const getKey = (idx: number) => `fødselsdatoer.flere.${idx}`;

class FødselsdatoerSpørsmål extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onDatoChange = this.onDatoChange.bind(this);
    }

    onDatoChange(dato: Fødselsdato, idx: number) {
        const datoer = [...this.props.fødselsdatoer];
        datoer[idx] = dato;
        this.props.onChange(datoer);
    }

    render() {
        const { fødselsdatoer } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato: Fødselsdato, idx: number) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInput
                            id={getKey(idx)}
                            dato={fødselsdatoer[idx]}
                            onChange={(d: Date) => this.onDatoChange(d, idx)}
                            label={
                                <Labeltekst
                                    intlId={`fødselsdatoer.flere.${idx + 1}`}
                                />
                            }
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default FødselsdatoerSpørsmål;
