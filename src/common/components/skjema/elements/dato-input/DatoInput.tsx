import * as React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import NavDatovelger from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { normaliserDato } from 'common/util/datoUtils';

import BEMHelper from 'common/util/bem';

export interface DatoInputProps extends DatovelgerCommonProps {
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    onChange: (dato?: Date) => void;
}

export type Props = DatoInputProps & InjectedIntlProps;

import './datoInput.less';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';

const bem = BEMHelper('datoInput');

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { id, label, postfix, feil, intl, onChange, ...rest } = this.props;
        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.className}>
                    <div className={bem.element('datovelger')}>
                        <NavDatovelger.Datovelger
                            {...rest}
                            id={id ? id : name}
                            locale={intl.locale}
                            input={{
                                id,
                                placeholder: 'dd.mm.åååå',
                                name
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
