import * as React from 'react';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { Fødselsdato } from '../types/common';
import { fødselsdatoAvgrensninger, getFødselsdatoRegler } from '../util/validation/fields/fødselsdato';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { Avgrensninger } from 'nav-datovelger';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: Fødselsdato[];
    onChange: (fødselsdatoer: Fødselsdato[]) => void;
    collapsed?: boolean;
    fødselsdatoAvgrensninger?: Avgrensninger;
}

type Props = FødselsdatoerSpørsmålProps & InjectedIntlProps;

const getKey = (idx: number) => `fødselsdatoer.flere.${idx}`;

class FødselsdatoerSpørsmål extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onDatoChange = this.onDatoChange.bind(this);
        this.renderCollapsedFødselsdatoSpørsmål = this.renderCollapsedFødselsdatoSpørsmål.bind(this);
        this.renderExpandedFødselsdatoSpørsmål = this.renderExpandedFødselsdatoSpørsmål.bind(this);
        this.getFødselsdatoAvgrensninger = this.getFødselsdatoAvgrensninger.bind(this);
    }

    onDatoChange(dato: Fødselsdato, idx: number) {
        const datoer = [...this.props.fødselsdatoer];
        datoer[idx] = dato;
        this.props.onChange(datoer);
    }

    getFødselsdatoAvgrensninger() {
        return {
            ...fødselsdatoAvgrensninger,
            ...this.props.fødselsdatoAvgrensninger
        };
    }

    renderCollapsedFødselsdatoSpørsmål() {
        const { fødselsdatoer, intl } = this.props;
        return (
            <DatoInput
                id="fødselsdatoe"
                name="fødsesdato"
                dato={fødselsdatoer[0]}
                onChange={(d: Date) => this.onDatoChange(d, 0)}
                label={<Labeltekst intlId="fødselsdatoer.fødsel.flereBarn" />}
                avgrensninger={this.getFødselsdatoAvgrensninger()}
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
                        <DatoInput
                            id={getKey(idx)}
                            name={getKey(idx)}
                            dato={fødselsdatoer[idx]}
                            onChange={(d: Date) => this.onDatoChange(d, idx)}
                            label={<Labeltekst intlId={`fødselsdatoer.flere.${idx + 1}`} />}
                            avgrensninger={this.getFødselsdatoAvgrensninger()}
                            validators={getFødselsdatoRegler(dato, intl)}
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    }

    render() {
        const { collapsed } = this.props;
        return collapsed ? this.renderCollapsedFødselsdatoSpørsmål() : this.renderExpandedFødselsdatoSpørsmål();
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
