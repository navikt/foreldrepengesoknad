import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';

export interface Props extends DatovelgerProps {
    dato?: Date;
    label: string | React.ReactNode;
    feil?: Feil;
}

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { label, feil, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <Datovelger
                    {...rest}
                    locale="nb"
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                />
            </SkjemaInputElement>
        );
    }
}

export default DatoInput;
