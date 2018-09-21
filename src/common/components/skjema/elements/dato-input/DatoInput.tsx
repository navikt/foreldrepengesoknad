import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import NavDatovelger, { DatovelgerProps } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { normaliserDato } from 'common/util/datoUtils';

import BEMHelper from 'common/util/bem';

export interface DatoInputProps extends DatovelgerProps {
    onChange: (dato?: Date) => void;
    label: string | React.ReactNode;
    postfix?: string;
    feil?: Feil;
}

export type Props = DatoInputProps & InjectedIntlProps;
import './datoInput.less';

const bem = BEMHelper('datoInput');

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { label, postfix, feil, intl, onChange, ...rest } = this.props;

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.className}>
                    <div className={bem.element('datovelger')}>
                        <NavDatovelger.Datovelger
                            {...rest}
                            locale={intl.locale}
                            input={{
                                placeholder: 'dd.mm.åååå'
                            }}
                            onChange={(dato) => onChange(dato ? normaliserDato(dato) : undefined)}
                        />
                    </div>
                    {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
                </div>
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
