import * as React from 'react';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { Fødselsdato } from '../types/common';
import DatoInputWithValidation from 'common/lib/validation/DatoInputWithValidation';
import {
    fødselsdatoAvgrensninger,
    getFødselsdatoRegler
} from '../util/validation/fødselsdato';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: Fødselsdato[];
    onChange: (fødselsdatoer: Fødselsdato[]) => void;
}

type Props = FødselsdatoerSpørsmålProps & InjectedIntlProps;

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
        const { fødselsdatoer, intl } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato: Fødselsdato, idx: number) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInputWithValidation
                            id={getKey(idx)}
                            name={getKey(idx)}
                            dato={fødselsdatoer[idx]}
                            onChange={(d: Date) => this.onDatoChange(d, idx)}
                            label={
                                <Labeltekst
                                    intlId={`fødselsdatoer.flere.${idx + 1}`}
                                />
                            }
                            avgrensninger={fødselsdatoAvgrensninger}
                            validators={getFødselsdatoRegler(dato, intl)}
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
