import * as React from 'react';

import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import NavDatovelger from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/elements/dato-input/datoInputDescription';

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

const bem = BEMHelper('datoInput');

class DatoInput extends React.Component<Props, {}> {
    render() {
        const { id, label, postfix, feil, intl, onChange, kalender, name, ...rest } = this.props;
        const avgrensningerTekst = this.props.avgrensninger
            ? getAvgrensningerDescriptionForInput(intl, this.props.avgrensninger)
            : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.className}>
                    <div className={bem.element('datovelger')}>
                        <NavDatovelger.Datovelger
                            {...rest}
                            id={id ? id : name}
                            locale={intl.locale}
                            kalender={kalender}
                            input={{
                                id,
                                placeholder: 'dd.mm.åååå',
                                name,
                                ariaDescribedby: ariaDescriptionId
                            }}
                            onChange={(dato) => onChange(dato ? dato : undefined)}
                        />
                        {ariaDescriptionId && (
                            <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                                {avgrensningerTekst}
                            </AriaText>
                        )}
                    </div>
                    {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
                </div>
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
