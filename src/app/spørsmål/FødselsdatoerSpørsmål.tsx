import * as React from 'react';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { DateValue } from '../types/common';
import { fødselsdatoAvgrensninger, getFødselsdatoRegler } from '../util/validation/fødselsdato';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger } from 'common/types';
import Block from 'common/components/block/Block';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: DateValue[];
    termindato?: Date;
    antallBarn: number | undefined;
    onChangeFødselsdato: (fødselsdatoer: DateValue[]) => void;
    onChangeTermindato?: (termindato: Date) => void;
    collapsed?: boolean;
    datoavgrensninger?: Avgrensninger;
    datovalidatorer?: Validator[];
    gjelderAdopsjon?: boolean;
}

type Props = FødselsdatoerSpørsmålProps & InjectedIntlProps;

const getKey = (idx: number) => `fødselsdatoer.flere.${idx}`;

class FødselsdatoerSpørsmål extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onFødselsdatoChange = this.onFødselsdatoChange.bind(this);
        this.renderCollapsedFødselsdatoSpørsmål = this.renderCollapsedFødselsdatoSpørsmål.bind(this);
        this.renderExpandedFødselsdatoSpørsmål = this.renderExpandedFødselsdatoSpørsmål.bind(this);
        this.getFødselsdatoAvgrensninger = this.getFødselsdatoAvgrensninger.bind(this);
        this.getValidatorer = this.getValidatorer.bind(this);
    }

    onFødselsdatoChange(dato: DateValue, idx: number) {
        const datoer = [...this.props.fødselsdatoer];
        datoer[idx] = dato;
        this.props.onChangeFødselsdato(datoer);
    }

    getFødselsdatoAvgrensninger() {
        return {
            ...fødselsdatoAvgrensninger,
            ...this.props.datoavgrensninger
        };
    }

    getValidatorer(): Validator[] {
        const { fødselsdatoer, datovalidatorer, intl } = this.props;
        return [
            ...(datovalidatorer || []),
            ...getFødselsdatoRegler(fødselsdatoer[0], this.props.gjelderAdopsjon === true, intl)
        ];
    }

    renderCollapsedFødselsdatoSpørsmål() {
        const { fødselsdatoer, antallBarn, termindato } = this.props;

        let intlIdFødsel = 'fødselsdatoer.fødsel';
        let intlIdTermin = 'fødselsdatoer.termin';

        if (antallBarn !== undefined && antallBarn > 1) {
            intlIdFødsel = 'fødselsdatoer.fødsel.flereBarn';
            intlIdTermin = 'fødselsdatoer.termin.flereBarn';
        }

        return (
            <>
                <Block>
                    <DatoInput
                        id="fødselsdato"
                        name="fødsesdato"
                        dato={fødselsdatoer[0]}
                        onChange={(d: Date) => this.onFødselsdatoChange(d, 0)}
                        label={<Labeltekst intlId={intlIdFødsel} />}
                        datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                        validators={this.getValidatorer()}
                    />
                </Block>
                <Block>
                    <DatoInput
                        id="termindato"
                        name="termindato"
                        dato={termindato}
                        onChange={(d: Date) => this.props.onChangeTermindato!(d)}
                        label={<Labeltekst intlId={intlIdTermin} />}
                        datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                        validators={this.getValidatorer()}
                    />
                </Block>
            </>
        );
    }

    renderExpandedFødselsdatoSpørsmål() {
        const { fødselsdatoer } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato: DateValue, idx: number) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInput
                            id={getKey(idx)}
                            name={getKey(idx)}
                            dato={fødselsdatoer[idx]}
                            onChange={(d: Date) => this.onFødselsdatoChange(d, idx)}
                            label={<Labeltekst intlId={`fødselsdatoer.flere.${idx + 1}`} />}
                            datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                            validators={this.getValidatorer()}
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
