import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import { Språkkode } from '../../intl/types';

export interface Props extends DatovelgerProps {
    dato?: Date;
    label: string | React.ReactNode;
    feil?: Feil;
    språkkode: Språkkode;
}

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { label, feil, språkkode, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <Datovelger
                    {...rest}
                    locale={språkkode}
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                />
            </SkjemaInputElement>
        );
    }
}

export default DatoInput;
