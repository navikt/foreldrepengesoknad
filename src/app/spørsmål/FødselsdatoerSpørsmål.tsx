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
    collapsed?: boolean;
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

    renderCollapsedFødselsdatoSpørsmål() {
        const { fødselsdatoer, intl } = this.props;
        return (
            <DatoInputWithValidation
                id="fødselsdatoe"
                name="fødsesdato"
                dato={fødselsdatoer[0]}
                onChange={(d: Date) => this.onDatoChange(d, 0)}
                label={<Labeltekst intlId="fødselsdatoer.fødsel" />}
                avgrensninger={fødselsdatoAvgrensninger}
                validators={getFødselsdatoRegler(fødselsdatoer[0], intl)}
            />
        );
    }

    renderExpandedFødselsdatoSpørsmål() {
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

    render() {
        const { collapsed } = this.props;
        return collapsed
            ? this.renderCollapsedFødselsdatoSpørsmål()
            : this.renderExpandedFødselsdatoSpørsmål();
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
