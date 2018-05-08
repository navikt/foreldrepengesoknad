import * as React from 'react';
import { Språkkode } from '../intl/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Labeltekst from '../components/labeltekst/Labeltekst';
import DatoInput from '../components/dato-input/DatoInput';

export type Fødselsdato = Date | undefined;

export interface OwnProps {
    fødselsdatoer: Fødselsdato[];
    onChange: (fødselsdatoer: Fødselsdato[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

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
                    <DatoInput
                        id={getKey(idx)}
                        key={getKey(idx)}
                        dato={fødselsdatoer[idx]}
                        onChange={(d: Date) => this.onDatoChange(d, idx)}
                        label={
                            <Labeltekst
                                intlId={`fødselsdatoer.flere.${idx + 1}`}
                            />
                        }
                        språkkode={intl.locale as Språkkode}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
