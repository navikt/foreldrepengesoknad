import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import NavDatovelger, { DatovelgerProps } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { normaliserDato } from 'common/util/datoUtils';

export interface DatoInputProps extends DatovelgerProps {
    onChange: (dato?: Date) => void;
    label: string | React.ReactNode;
    feil?: Feil;
}

export type Props = DatoInputProps & InjectedIntlProps;

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { label, feil, intl, onChange, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <NavDatovelger.Datovelger
                    {...rest}
                    locale={intl.locale}
                    input={{
                        placeholder: 'dd.mm.åååå'
                    }}
                    onChange={(dato) => onChange(dato ? normaliserDato(dato) : undefined)}
                />
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
