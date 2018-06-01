import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface OwnProps extends DatovelgerProps {
    label: string | React.ReactNode;
    feil?: Feil;
}

export type Props = OwnProps & InjectedIntlProps;

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { label, feil, intl, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <Datovelger
                    {...rest}
                    locale={intl.locale}
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                />
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
